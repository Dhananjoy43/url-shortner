import { Redis } from "@upstash/redis";

import { env } from "./env";

// For Upstash REST API
export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const redisClient = {
  incr: (key: string) => redis.incr(key),
  expire: (key: string, seconds: number) => redis.expire(key, seconds),
  ttl: (key: string) => redis.ttl(key),
};

// Test connectivity
await redis.ping(); // Returns "PONG"
