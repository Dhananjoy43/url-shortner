"use client";

import {
  BarChart3,
  Link as LinkIcon,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";

import SummaryCard from "@/components/global/summary-card";

import { useGetDashboardKpis } from "@/features/links/api/use-get-dashboard-kpis";

export const DashboardKPIs = () => {
  const { data, isLoading } = useGetDashboardKpis();

  const totalLinks = data?.totalLinks || 0;
  const totalClicks = data?.totalClicks || 0;
  const activeLinks = data?.activeLinks || 0;
  const engagementRate = data?.engagementRate || "0.0";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Links"
        value={totalLinks}
        description="Active short URLs"
        icon={LinkIcon}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Total Clicks"
        value={totalClicks}
        description="Across all your links"
        icon={MousePointerClick}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Active Links"
        value={activeLinks}
        description="Links with > 0 clicks"
        icon={BarChart3}
        isLoading={isLoading}
      />
      <SummaryCard
        title="Engagement Rate"
        value={engagementRate}
        suffix="%"
        description="Links currently receiving traffic"
        icon={TrendingUp}
        isLoading={isLoading}
      />
    </div>
  );
};
