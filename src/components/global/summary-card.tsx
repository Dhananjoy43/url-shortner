import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SummaryCard({
  title,
  value,
  suffix,
  icon: Icon,
  description,
  iconClassName,
  isLoading,
}: {
  title: string;
  value: number | string;
  suffix?: string;
  icon: LucideIcon;
  description?: string;
  iconClassName?: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <SummaryCardSkeleton />;
  }
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={cn("text-muted-foreground size-4", iconClassName)} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">
            {value}
            {suffix && <span className="text-lg">{suffix}</span>}
          </div>
        </div>
        {description && (
          <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function SummaryCardSkeleton() {
  return (
    <Card className="shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-5 w-8" />
        </div>

        <Skeleton className="mt-2 h-3 w-32" />
      </CardContent>
    </Card>
  );
}
