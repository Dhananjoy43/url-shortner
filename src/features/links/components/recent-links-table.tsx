"use client";

import { useRouter } from "next/navigation";
import { IconLink } from "@tabler/icons-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetLinks } from "@/features/links/api/use-get-links";
import { LinkDetailsCard } from "@/features/links/components/links-table/link-details-card";

export const RecentLinksTable = () => {
  const { data, isLoading } = useGetLinks(1, 6);
  const router = useRouter();
  const links = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!links.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconLink className="text-primary" />
          </EmptyMedia>
          <EmptyTitle>No recent links</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any short URLs yet. Start by creating your
            first short link.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Recent Links</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {links.map((link, i) => (
          <LinkDetailsCard
            key={link.id}
            link={link}
            index={i}
            onAnalytics={(slug) => {
              router.push(`/dashboard/links/${slug}/analytics`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
