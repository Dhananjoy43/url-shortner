"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { ShortlinksProps } from "@/features/links/types";

import { Actions } from "./actions";

export const columns: ColumnDef<ShortlinksProps>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 120,
    cell: ({ row }) => (
      <span className="truncate font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "slug",
    header: "Short Url",
    size: 40,
    cell: ({ row }) => {
      const slug = row.getValue("slug");
      return (
        <Link
          href={`${env.NEXT_PUBLIC_BASE_URL}/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link", size: "sm" }))}
        >
          {`${env.NEXT_PUBLIC_BASE_URL}/${slug}`}
        </Link>
      );
    },
  },
  {
    accessorKey: "destinationUrl",
    header: "Destination Url",
    size: 40,
    cell: ({ row }) => {
      const slug = row.getValue("destinationUrl") as string;
      return (
        <Link
          href={slug}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link", size: "sm" }))}
        >
          View
        </Link>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    size: 60,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "success" : "destructive"}>
          {isActive ? "Published" : "Draft"}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      const rowValue = row.getValue(columnId) as boolean;
      return filterValue.includes(rowValue ? "Published" : "Draft");
    },
  },
  {
    accessorKey: "createdAt",
    header: "Publish Date",
    size: 100,
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string | null;
      if (!date) return <span className="text-muted-foreground">—</span>;
      return format(new Date(date), "hh:mm a, PP");
    },
  },
  {
    id: "actions",
    size: 40,
    header: "Actions",
    cell: ({ row }) => {
      const notice = row.original;

      return <Actions {...notice} />;
    },
  },
];
