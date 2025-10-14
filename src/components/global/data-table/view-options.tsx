"use client";

import { Table } from "@tanstack/react-table";
import { Columns3Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ViewOptionsProps<TData> {
  table: Table<TData>;
}

export function ViewOptions<TData>({ table }: ViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <Columns3Icon className="opacity-60" aria-hidden="true" />
          <span className="hidden md:inline">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(
            (column) => column.getCanHide() && column.id !== "index" // ⬅️ hide index
          )
          .map((column) => {
            // Use the header label if possible, else fallback to id
            const label =
              typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : column.id.replace(/([a-z])([A-Z])/g, "$1 $2"); // make camelCase → words

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
