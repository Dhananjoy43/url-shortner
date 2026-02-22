import { Ratelimit } from "@upstash/ratelimit";
import { Context } from "hono";

import { redis } from "./redis";

/**
 * Creates a rate limit middleware using a sliding window algorithm via Upstash.
 *
 * @param {number} limit - The maximum number of requests allowed within the time window.
 * @param {number} [windowMs=60000] - The sliding window duration in milliseconds (default is 60,000ms or 1 minute).
 * @returns {Function} A Hono middleware that enforces the rate limit.
 */
export const createRateLimiter = (
  limit: number,
  windowMs: number = 60 * 1000
) => {
  const windowSecs = Math.max(1, Math.floor(windowMs / 1000));

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSecs} s`),
    analytics: true,
  });

  return async (c: Context, next: () => Promise<void>) => {
    const xff = c.req.header("x-forwarded-for");
    let ip = xff ? xff.split(",")[0].trim() : undefined;

    // @ts-ignore fallback for local remote address
    if (!ip) ip = c.req.raw?.socket?.remoteAddress;

    const identifier = ip || "anonymous";

    const {
      success,
      limit: rateLimit,
      remaining,
      reset,
    } = await ratelimit.limit(identifier);

    c.header("RateLimit-Limit", rateLimit.toString());
    c.header("RateLimit-Remaining", remaining.toString());
    c.header("RateLimit-Reset", reset.toString());

    if (!success) {
      return c.json({ error: "Too Many Requests" }, 429);
    }

    await next();
  };
};
