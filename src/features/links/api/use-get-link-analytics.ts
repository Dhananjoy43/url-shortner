import { useQuery } from "@tanstack/react-query";

import { hc } from "@/lib/hono";

export type TimeSeriesData = {
  date: string;
  clicks: number;
};

export type DeviceData = {
  device: string | null;
  clicks: number;
};

export type BrowserData = {
  browser: string | null;
  clicks: number;
};

export type OsData = {
  os: string | null;
  clicks: number;
};

export type LocationData = {
  country: string | null;
  clicks: number;
};

export type ReferrerData = {
  referrer: string | null;
  clicks: number;
};

export type AnalyticsResponse = {
  slug: string;
  totalClicks: number;
  timeSeries: TimeSeriesData[];
  devices: DeviceData[];
  browsers: BrowserData[];
  os: OsData[];
  locations: LocationData[];
  referrers: ReferrerData[];
};

export const useGetLinkAnalytics = (slug: string) => {
  return useQuery<AnalyticsResponse>({
    queryKey: ["link-analytics", slug],
    queryFn: async () => {
      const res = await hc.api.links[":slug"].stats.$get({
        param: { slug },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch link analytics");
      }

      const data = await res.json();
      return data as unknown as AnalyticsResponse;
    },
    enabled: !!slug,
  });
};
