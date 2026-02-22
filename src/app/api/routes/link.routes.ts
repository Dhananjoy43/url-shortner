import { db } from "@/db";
import { schema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";
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
    const { limit, offset } = ctx.req.valid("query");
    const { user } = await getServerAuth(ctx);
    if (!user.id) return ctx.json({ error: "Unauthorized" }, 401);

    const data = await db.query.link.findMany({
      where: (link, { eq }) => eq(link.userId, user.id),
      orderBy: (link, { desc }) => desc(link.createdAt),
      limit,
      offset,
    });

    // Fetch total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.link);

    return ctx.json(
      {
        data,
        totalCount: count,
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
    return ctx.json({ slug, totalClicks });
  });

export default linkRoutes;
