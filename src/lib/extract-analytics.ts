import { Context } from "hono";
import { UAParser } from "ua-parser-js";

export function extractAnalytics(ctx: Context) {
  const headers = ctx.req.header();

  // ✅ IP address
  const ip =
    headers["x-real-ip"] ||
    headers["x-forwarded-for"]?.split(",")[0].trim() ||
    headers["x-vercel-ip"] ||
    "unknown";

  // ✅ Country fallback (Vercel → Cloudflare → unknown)
  const country =
    headers["x-vercel-ip-country"] || headers["cf-ipcountry"] || "unknown";

  // ✅ City / Region if available
  const city = headers["x-vercel-ip-city"] || "unknown";
  const region = headers["x-vercel-ip-country-region"] || "unknown";

  // ✅ Referrer (can be empty if user navigates directly)
  const referrer = headers["referer"] || headers["referrer"] || "unknown";

  // ✅ User agent + device info
  const userAgent = headers["user-agent"] ?? "unknown";
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || "unknown";
  const browser = parser.getBrowser().name || "unknown";
  const os = parser.getOS().name || "unknown";

  return {
    ip,
    country,
    city,
    region,
    referrer,
    userAgent,
    deviceType,
    browser,
    os,
  };
}
