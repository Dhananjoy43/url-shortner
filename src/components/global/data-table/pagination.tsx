import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  totalCount?: number; // optional, if API returns total
}

export function TablePagination({
  page,
  setPage,
  limit,
  totalCount,
}: PaginationProps) {
  const totalPages = totalCount ? Math.ceil(totalCount / limit) : undefined;

  return (
    <div className="mt-4 flex items-center justify-between gap-8">
      {/* Page number information */}
      <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
        {totalCount != null ? ( // Changed to check for null/undefined to handle 0 correctly
          <p aria-live="polite">
            <span className="text-foreground">
              {Math.min((page - 1) * limit + 1, totalCount)}-
              {Math.min(page * limit, totalCount)}
            </span>{" "}
            of <span className="text-foreground">{totalCount}</span>
          </p>
        ) : (
          <p>Page {page}</p>
        )}
      </div>

      {/* Pagination buttons */}
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setPage(1)}
                disabled={page === 1}
                aria-label="Go to first page"
              >
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={!totalPages || page >= totalPages}
                aria-label="Go to next page"
              >
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => totalPages && setPage(totalPages)}
                disabled={!totalPages || page >= totalPages}
                aria-label="Go to last page"
              >
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
