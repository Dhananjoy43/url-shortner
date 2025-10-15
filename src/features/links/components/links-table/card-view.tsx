"use client";

import { IconLink } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useSidebar } from "@/components/ui/sidebar";

import { LinkDetailsPros } from "@/features/links/types";

import { useShortenLinkStore } from "../../store/shorten-link-dialog-store";
import { LinkDetailsCard } from "./link-details-card";

interface CardViewProps<TData> {
  table: Table<TData>;
}

export function CardView<TData>({ table }: CardViewProps<TData>) {
  const { open } = useSidebar();
  const { onOpen } = useShortenLinkStore();

  const links = table
    .getRowModel()
    .rows.map((row) => row.original) as LinkDetailsPros[];

  if (!links?.length) {
    const isFilterActive = !!(table
      ?.getColumn("title")
      ?.getFilterValue() as string);

    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconLink className="text-primary" />
          </EmptyMedia>
          <EmptyTitle>
            {isFilterActive ? "No links match your search" : "No links found"}
          </EmptyTitle>
          <EmptyDescription>
            {isFilterActive
              ? "Try adjusting your search or filter to find what you&apos;re looking for."
              : "You haven&apos;t created any short URLs yet. Start by creating your first short link to easily share and track your URLs."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {!isFilterActive && (
            <Button onClick={onOpen}>
              <IconLink />
              Create a short URL
            </Button>
          )}
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3",
        open && "lg:grid-cols-2"
      )}
    >
      {links.map((link, i) => {
        return (
          <LinkDetailsCard
            link={link}
            index={i}
            onAnalytics={() => {
              toast.warning("Coming Soon!");
            }}
          />
        );
      })}
    </div>
  );
}
