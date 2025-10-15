"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, Copy } from "lucide-react";
import { useCopyToClipboard } from "react-use";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

import { ShortlinksProps } from "@/features/links/types";

import { Actions } from "./actions";

export const columns: ColumnDef<ShortlinksProps>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 120,
    cell: ({ row }) => (
      <p className="truncate text-left font-medium capitalize">
        {row.getValue("title")}
      </p>
    ),
  },
  {
    accessorKey: "slug",
    header: "Short Url",
    size: 40,
    cell: ({ row }) => {
      const slug = row.getValue("slug");
      const shortUrl = `${env.NEXT_PUBLIC_BASE_URL}/${slug}`;

      const [, copyToClipboard] = useCopyToClipboard();
      const [copied, setCopied] = useState(false);

      const handleCopy = async () => {
        copyToClipboard(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      };

      return (
        <Button
          variant="link"
          size="sm"
          onClick={handleCopy}
          className="flex w-full cursor-pointer justify-start truncate font-mono text-sm"
          disabled={copied}
        >
          {copied ? <CheckCheck className="text-emerald-300" /> : <Copy />}
          <span>{shortUrl}</span>
        </Button>
      );
    },
  },
  {
    accessorKey: "destinationUrl",
    header: "Target",
    size: 40,
    cell: ({ row }) => {
      const slug = row.getValue("destinationUrl") as string;
      return (
        <a
          href={slug}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link", size: "sm" }))}
        >
          View
        </a>
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
    accessorKey: "clicks",
    header: "Clicks",
    size: 100,
  },
  {
    id: "actions",
    size: 40,
    header: "",
    cell: ({ row }) => {
      const notice = row.original;

      return <Actions {...notice} />;
    },
  },
];
