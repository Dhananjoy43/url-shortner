import { BarChart3 } from "lucide-react";

import { env } from "@/lib/env";

import { AnalyticsDashboard } from "@/features/links/components/analytics-dashboard";

export default async function AnalyticsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  return (
    <div className="container max-w-6xl space-y-8 py-8">
      <div className="flex flex-col items-start gap-3 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
            <BarChart3 className="text-primary size-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Link Analytics</h1>
        </div>
        <p className="text-muted-foreground text-base">
          Detailed performance metrics and visitor insights for{" "}
          <span className="text-foreground bg-muted/50 rounded-md px-1.5 py-0.5 font-mono font-medium">
            {env.NEXT_PUBLIC_BASE_URL}/{params.slug}
          </span>
        </p>
      </div>

      <AnalyticsDashboard slug={params.slug} />
    </div>
  );
}
