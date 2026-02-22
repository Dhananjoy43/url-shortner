import { db } from "@/db";
import { schema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { Hono } from "hono";
import { nanoid } from "nanoid";

import { extractAnalytics } from "@/lib/extract-analytics";
import { getServerAuth } from "@/lib/get-server-auth";
import { createRateLimiter } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import { paginationQueryValidator } from "@/app/api/middlewares/pagination.validator";

import { ShortLinkSchema } from "@/features/links/schema";

export const linkRoutes = new Hono()

  // 🧭 1️⃣ Get all links for the authenticated user
  .get("/", paginationQueryValidator, createRateLimiter(5), async (ctx) => {
    const { limit, offset, search } = ctx.req.valid("query");
    const { user } = await getServerAuth(ctx);
    if (!user.id) return ctx.json({ error: "Unauthorized" }, 401);

    const whereClause = search
      ? and(
          eq(schema.link.userId, user.id),
          or(
            ilike(schema.link.title, `%${search}%`),
            ilike(schema.link.slug, `%${search}%`)
          )
        )
      : eq(schema.link.userId, user.id);

    const data = await db.query.link.findMany({
      where: whereClause,
      orderBy: (link, { desc }) => desc(link.createdAt),
      limit,
      offset,
    });

    // Fetch total count for this user
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.link)
      .where(whereClause);

    return ctx.json(
      {
        data,
        totalCount: Number(count),
      },
      200
    );
  })
  .get("/:slug/redirect", async (ctx) => {
    const { slug } = ctx.req.param();

    const link = await db.query.link.findFirst({
      where: (link, { eq }) => eq(link.slug, slug),
    });
    if (!link) return ctx.json({ error: "Link not found" }, 404);

    const analytics = extractAnalytics(ctx);
    console.log("Analytics: ", analytics);

    const {
      ip,
      country,
      region,
      city,
      os,
      deviceType,
      userAgent,
      browser,
      referrer,
    } = analytics;
    await db
      .update(schema.link)
      .set({
        clicks: sql`${schema.link.clicks} + 1`,
      })
      .where(eq(schema.link.slug, slug));

    await db
      .insert(schema.linkAnalytics)
      .values({
        linkId: link.id,
        ipAddress: ip,
        country,
        region,
        city,
        os,
        deviceType,
        userAgent,
        browser,
        referrer,
      })
      .returning();
    return ctx.redirect(link.destinationUrl, 302);
  })

  // 🔗 2️⃣ Create a new short link
  .post(
    "/",
    zValidator("json", ShortLinkSchema),
    createRateLimiter(60),
    async (ctx) => {
      const { user, session } = await getServerAuth(ctx);
      if (!user || !session) return ctx.json({ error: "Unauthorized" }, 401);

      const { title, url, slug } = ctx.req.valid("json");

      // Check for existing slug
      const existing = await db.query.link.findFirst({
        where: (link, { eq }) => eq(link.slug, slug),
      });

      if (existing) return ctx.json({ error: "Slug already in use" }, 400);

      let unique_link_id = "";
      if (!slug || slug === "") {
        unique_link_id = nanoid(8);
      }

      // Create the new short link
      const [newLink] = await db
        .insert(schema.link)
        .values({
          title,
          destinationUrl: url,
          slug: slug || unique_link_id,
          userId: user.id,
        })
        .returning();

      return ctx.json(newLink, 201);
    }
  )

  // 📊 3️⃣ Get link details by slug (for analytics dashboard)
  .get("/:slug", createRateLimiter(60), async (ctx) => {
    const { slug } = ctx.req.param();

    // Check Redis cache first
    const cachedUrl = await redis.get<string>(`slug:${slug}`);
    if (cachedUrl) {
      const clicks = (await redis.get<number>(`clicks:${slug}`)) ?? 0;
      return ctx.json({ slug, url: cachedUrl, clicks, source: "cache" });
    }

    // Fallback to database
    const link = await db.query.link.findFirst({
      where: (link, { eq }) => eq(link.slug, slug),
    });

    if (!link) return ctx.json({ error: "Link not found" }, 404);

    return ctx.json({ link });
  })

  // 🗑️ 4️⃣ Delete link
  .delete("/:id", createRateLimiter(10), async (ctx) => {
    const { user, session } = await getServerAuth(ctx);
    if (!user || !session) return ctx.json({ error: "Unauthorized" }, 401);

    const { id } = ctx.req.param();

    // 1️⃣ Find link first
    const link = await db.query.link.findFirst({
      where: (fields) => eq(fields.id, id),
    });

    if (!link) return ctx.json({ error: "Link not found" }, 404);

    // 2️⃣ Permission check
    if (link.userId !== user.id) return ctx.json({ error: "Forbidden" }, 403);

    // 3️⃣ Delete using same Drizzle instance
    await db.delete(schema.link).where(eq(schema.link.id, id));

    // 4️⃣ Remove Redis cache
    await redis.del(`slug:${link.slug}`);
    await redis.del(`clicks:${link.slug}`);

    return ctx.json({ message: "Link deleted" });
  })

  // ✏️  Update link
  .patch(
    "/:id",
    zValidator("json", ShortLinkSchema),
    createRateLimiter(5),
    async (ctx) => {
      const { user, session } = await getServerAuth(ctx);
      if (!user || !session) return ctx.json({ error: "Unauthorized" }, 401);

      const { id } = ctx.req.param();
      const { title, url, slug } = ctx.req.valid("json");

      // Check ownership
      const link = await db.query.link.findFirst({
        where: (fields) => eq(fields.id, id),
      });

      if (!link) return ctx.json({ error: "Link not found" }, 404);
      if (link.userId !== user.id) return ctx.json({ error: "Forbidden" }, 403);

      // Check if new slug conflicts with others
      if (slug && slug !== link.slug) {
        const existing = await db.query.link.findFirst({
          where: (fields) => eq(fields.slug, slug),
        });
        if (existing) return ctx.json({ error: "Slug already in use" }, 400);
      }

      // Update
      const [updatedLink] = await db
        .update(schema.link)
        .set({
          title,
          destinationUrl: url,
          slug: slug || link.slug,
        })
        .where(eq(schema.link.id, id))
        .returning();

      // Clear old redis cache if slug changed
      if (slug && slug !== link.slug) {
        await redis.del(`slug:${link.slug}`);
        await redis.del(`clicks:${link.slug}`);
      }

      // We can also clear/update the new slug, but we usually just let it handle lazily
      await redis.del(`slug:${updatedLink.slug}`);

      return ctx.json(updatedLink);
    }
  )

  // 📈 5️⃣ Analytics summary for a slug
  .get("/:slug/stats", createRateLimiter(5), async (ctx) => {
    const { user, session } = await getServerAuth(ctx);
    if (!user || !session) return ctx.json({ error: "Unauthorized" }, 401);

    const { slug } = ctx.req.param();
    const link = await db.query.link.findFirst({
      where: (link, { eq }) => eq(link.slug, slug),
    });

    if (!link) return ctx.json({ error: "Link not found" }, 404);
    if (link.userId !== user.id) return ctx.json({ error: "Forbidden" }, 403);

    const totalClicks = (await redis.get<number>(`clicks:${slug}`)) ?? 0;

    // Aggregations
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

    const timeSeries = await db
      .select({
        date: sql<string>`DATE(${schema.linkAnalytics.timestamp})`,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(
        and(
          eq(schema.linkAnalytics.linkId, link.id),
          sql`${schema.linkAnalytics.timestamp} >= ${date30DaysAgo}`
        )
      )
      .groupBy(sql`DATE(${schema.linkAnalytics.timestamp})`)
      .orderBy(sql`DATE(${schema.linkAnalytics.timestamp})`);

    const devices = await db
      .select({
        device: schema.linkAnalytics.deviceType,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(eq(schema.linkAnalytics.linkId, link.id))
      .groupBy(schema.linkAnalytics.deviceType)
      .orderBy(sql`count(*) DESC`);

    const browsers = await db
      .select({
        browser: schema.linkAnalytics.browser,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(eq(schema.linkAnalytics.linkId, link.id))
      .groupBy(schema.linkAnalytics.browser)
      .orderBy(sql`count(*) DESC`);

    const os = await db
      .select({
        os: schema.linkAnalytics.os,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(eq(schema.linkAnalytics.linkId, link.id))
      .groupBy(schema.linkAnalytics.os)
      .orderBy(sql`count(*) DESC`);

    const locations = await db
      .select({
        country: schema.linkAnalytics.country,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(eq(schema.linkAnalytics.linkId, link.id))
      .groupBy(schema.linkAnalytics.country)
      .orderBy(sql`count(*) DESC`);

    const referrers = await db
      .select({
        referrer: schema.linkAnalytics.referrer,
        clicks: sql<number>`count(*)`,
      })
      .from(schema.linkAnalytics)
      .where(eq(schema.linkAnalytics.linkId, link.id))
      .groupBy(schema.linkAnalytics.referrer)
      .orderBy(sql`count(*) DESC`);

    return ctx.json({
      slug,
      totalClicks,
      timeSeries,
      devices,
      browsers,
      os,
      locations,
      referrers,
    });
  });

export default linkRoutes;
