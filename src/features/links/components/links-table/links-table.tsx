"use client";

import { useState } from "react";
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
import { ChevronDownIcon, ChevronUpIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { ViewOptions } from "@/components/global/data-table/view-options";

import { useGetLinks } from "@/features/links/api/use-get-links";
import { useShortenLinkStore } from "@/features/links/store/shorten-link-dialog-store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function LinksTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { onOpen } = useShortenLinkStore();
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
      <div className="flex items-center gap-1 py-2 md:gap-2 md:py-4">
        <SearchInput
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(val) => table.getColumn("title")?.setFilterValue(val)}
          placeholder="Filter by title..."
        />
        {/* <StatusFilter table={table} /> */}
        <ViewOptions table={table} />
        {/* <Button onClick={onOpen} size={"sm"} className="ml-auto cursor-pointer">
          <Plus />
          <span className="hidden md:inline">Add Notice</span>
        </Button> */}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="border font-semibold"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUpIcon className="opacity-60" size={16} />
                          ),
                          desc: (
                            <ChevronDownIcon className="opacity-60" size={16} />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  {error.message || "Failed to load links"}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        page={page}
        setPage={setPage}
        limit={limit}
        totalCount={data?.totalCount} // if API returns it
      />
    </div>
  );
}
