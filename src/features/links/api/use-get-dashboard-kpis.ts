"use client";

import { useQuery } from "@tanstack/react-query";

import { hc } from "@/lib/hono";

export function useGetDashboardKpis() {
  return useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: async () => {
      // Fetch a larger batch for basic stats
      const res = await hc.api.links.$get({
        query: { offset: "0", limit: "100" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard KPIs");
      }

      const linksData = await res.json();

      const totalLinks = linksData?.totalCount || 0;

      // Calculate total clicks across all fetched links
      const totalClicks =
        linksData?.data?.reduce((acc, link) => acc + (link.clicks || 0), 0) ||
        0;

      // Calculate active links (links that have received at least one click)
      const activeLinks =
        linksData?.data?.filter((link) => (link.clicks || 0) > 0).length || 0;

      // Calculate engagement rate
      const engagementRate =
        totalLinks > 0 ? ((activeLinks / totalLinks) * 100).toFixed(1) : "0.0";

      return {
        totalLinks,
        totalClicks,
        activeLinks,
        engagementRate,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
