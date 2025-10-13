import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

import { auth } from "@/lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.use(
  "/api/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: process.env.NEXT_PUBLIC_BASE_URL!, // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// ✅ Better Auth Endpoints
app.all("/auth/*", async (c) => {
  const res = await auth.handler(c.req.raw);
  return res; // Return Response directly
});

app.onError((err, ctx) => {
  console.log("Error: ", err);

  if (err instanceof HTTPException) {
    if (err.status === 401) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }
  }
  return ctx.json({ error: "Internal Server Error" }, 500);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
