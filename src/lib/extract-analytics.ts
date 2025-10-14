import { Context } from "hono";
import { UAParser } from "ua-parser-js";

export function extractAnalytics(ctx: Context) {
  const forwardedFor = ctx.req.header("x-forwarded-for");
  const realIp = ctx.req.header("x-real-ip");
  const cfConnectingIp = ctx.req.header("cf-connecting-ip");

  const ip =
    (cfConnectingIp ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      realIp) ??
    "unknown";

  const userAgent = ctx.req.header("user-agent") ?? "unknown";
  const referrer = ctx.req.header("referer") ?? null;
  const country = ctx.req.header("cf-ipcountry") ?? "unknown";

  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || "desktop";
  const browser = parser.getBrowser().name;
  const os = parser.getOS().name;

  return {
    ip,
    userAgent,
    referrer,
    country,
    deviceType,
    browser,
    os,
  };
}
