"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Globe, MonitorSmartphone, MousePointerClick } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import SummaryCard from "@/components/global/summary-card";

import { useGetLinkAnalytics } from "@/features/links/api/use-get-link-analytics";

interface AnalyticsDashboardProps {
  slug: string;
}

const timeSeriesConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const devicesConfig = {
  clicks: { label: "Clicks" },
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
  tablet: { label: "Tablet", color: "var(--color-chart-3)" },
  unknown: { label: "Unknown", color: "var(--color-chart-4)" },
} satisfies ChartConfig;

const browsersConfig = {
  clicks: { label: "Clicks" },
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  unknown: { label: "Unknown", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const osConfig = {
  clicks: { label: "Clicks" },
  windows: { label: "Windows", color: "var(--color-chart-1)" },
  macos: { label: "macOS", color: "var(--color-chart-2)" },
  ios: { label: "iOS", color: "var(--color-chart-3)" },
  android: { label: "Android", color: "var(--color-chart-4)" },
  unknown: { label: "Unknown", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

export const AnalyticsDashboard = ({ slug }: AnalyticsDashboardProps) => {
  const { data, isLoading, error } = useGetLinkAnalytics(slug);

  const formattedTimeSeries = useMemo(() => {
    if (!data?.timeSeries?.length) return [];
    return data.timeSeries.map((item) => ({
      ...item,
      displayDate: format(parseISO(item.date), "MMM dd"),
    }));
  }, [data]);

  const deviceData = useMemo(() => {
    if (!data?.devices?.length) return [];
    return data.devices.map((d, index) => {
      const key = (d.device || "Unknown").toLowerCase();
      return {
        ...d,
        device: key,
        fill: `var(--color-${key}, var(--color-chart-${(index % 5) + 1}))`,
      };
    });
  }, [data]);

  const browserData = useMemo(() => {
    if (!data?.browsers?.length) return [];
    return data.browsers.map((b, index) => {
      const key = (b.browser || "Unknown").toLowerCase();
      return {
        ...b,
        browser: key,
        fill: `var(--color-${key}, var(--color-chart-${(index % 5) + 1}))`,
      };
    });
  }, [data]);

  const osData = useMemo(() => {
    if (!data?.os?.length) return [];
    return data.os.map((o, index) => {
      const key = (o.os || "Unknown").toLowerCase();
      return {
        ...o,
        os: key,
        fill: `var(--color-${key}, var(--color-chart-${(index % 5) + 1}))`,
      };
    });
  }, [data]);

  const referrersData = data?.referrers || [];
  const totalClicksDisplay = data?.totalClicks || 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center p-10 text-center">
        <p>Failed to load analytics.</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Clicks"
          value={totalClicksDisplay}
          description="Lifetime clicks"
          icon={MousePointerClick}
        />
        <SummaryCard
          title="Unique Devices"
          value={deviceData.length}
          description="Found in last 30 days"
          icon={MonitorSmartphone}
        />
        <SummaryCard
          title="Countries Reached"
          value={data?.locations?.length || 0}
          description="Found in last 30 days"
          icon={Globe}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clicks Over Time</CardTitle>
          <CardDescription>Daily clicks for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={timeSeriesConfig}
            className="h-[350px] w-full"
          >
            <AreaChart data={formattedTimeSeries}>
              <defs>
                <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="displayDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="clicks"
                type="natural"
                fill="url(#fillClicks)"
                stroke="var(--color-clicks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Device Types Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Devices</CardTitle>
            <CardDescription>Clicks by device type</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={devicesConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={deviceData}
                  dataKey="clicks"
                  nameKey="device"
                  innerRadius={60}
                  strokeWidth={5}
                />
                <ChartLegend
                  content={<ChartLegendContent />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Browser Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
            <CardDescription>Top browsers used</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={browsersConfig}
              className="h-[250px] w-full"
            >
              <BarChart
                data={browserData}
                layout="vertical"
                margin={{ right: 16 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide
                />
                <XAxis dataKey="clicks" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="clicks" layout="vertical" radius={4}>
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Operating Systems Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Operating Systems</CardTitle>
            <CardDescription>Clicks by OS</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={osConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={osData}
                  dataKey="clicks"
                  nameKey="os"
                  innerRadius={60}
                  strokeWidth={5}
                />
                <ChartLegend
                  content={<ChartLegendContent />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Referrers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
            <CardDescription>Where your traffic comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrersData.slice(0, 6).map((ref, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="max-w-[200px] truncate text-sm font-medium">
                    {ref.referrer || "Direct"}
                  </span>
                  <span className="bg-muted rounded-md px-2 py-1 text-sm font-bold">
                    {ref.clicks}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
