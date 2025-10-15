"use client";

import { useState } from "react";
import { IconLink } from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LayoutGrid, Loader2, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/global/data-table/pagination";
import { SearchInput } from "@/components/global/data-table/search-input";

import { useGetLinks } from "@/features/links/api/use-get-links";

import { CardView } from "./card-view";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function LinksTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"table" | "card">("card");
  const limit = 12;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, isLoading, error } = useGetLinks(page, limit);

  const links = data?.data ?? [];

  const table = useReactTable({
    data: links as TData[],
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    manualPagination: true, // we’re fetching pages from the server
    pageCount: -1, // unknown total count unless you add it in API
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="rounded-md border p-2 md:p-4">
      <div className="flex items-center justify-between gap-2 py-4">
        <SearchInput
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(val) => table.getColumn("title")?.setFilterValue(val)}
          placeholder="Filter by title..."
        />

        <div className="flex gap-1">
          <Button
            size="icon"
            variant={view === "table" ? "default" : "outline"}
            onClick={() => setView("table")}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={view === "card" ? "default" : "outline"}
            onClick={() => setView("card")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error.message}</div>
      ) : view === "table" ? (
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border text-center font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="border text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <IconLink className="text-primary" />
                        </EmptyMedia>
                        <EmptyTitle>
                          {table.getColumn("title")?.getFilterValue()
                            ? "No links match your search"
                            : "No links found"}
                        </EmptyTitle>
                        <EmptyDescription>
                          {table.getColumn("title")?.getFilterValue()
                            ? "Try adjusting your search or filter to find links."
                            : "You haven&apos;t created any short URLs yet. Create one to get started."}
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <CardView table={table} />
      )}

      <TablePagination
        page={page}
        setPage={setPage}
        limit={limit}
        totalCount={data?.totalCount}
      />
    </div>
  );
}
