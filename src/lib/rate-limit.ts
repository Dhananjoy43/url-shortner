import { RedisStore } from "@hono-rate-limiter/redis";
import { rateLimiter } from "hono-rate-limiter";

import { redis } from "./redis";

export const createRateLimiter = (
  limit: number,
  windowMs: number = 60 * 1000
) => {
  return rateLimiter({
    windowMs,
    limit,
    standardHeaders: "draft-6",
    keyGenerator: (c) => {
      const xff = c.req.raw.headers.get("x-forwarded-for");
      if (xff) return xff.split(",")[0].trim();
      // @ts-ignore
      return c.req.raw.socket?.remoteAddress || "anonymous";
    },
    store: new RedisStore({ client: redis }),
  });
};
