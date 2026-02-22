"use client";

import { IconLink } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridPatternBackground } from "@/components/aceternity/grid-pattern-background";

import { useShortenLinkStore } from "@/features/links/store/shorten-link-dialog-store";

export function Banner() {
  const { onOpen } = useShortenLinkStore();
  return (
    <header className="bg-card relative w-full overflow-hidden rounded-xl border p-6 shadow-sm md:p-8">
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl shadow-sm">
              <IconLink className="h-5 w-5" />
            </div>
            <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome to Shortly
            </h2>
          </div>
          <p className="text-muted-foreground text-base text-pretty sm:text-lg">
            Create short, shareable links in seconds. Simplify your URLs, track
            clicks, and share with ease—perfect for social media, marketing, or
            personal use.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="bg-secondary/50 font-medium">
              Fast & Free
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50 font-medium">
              Trackable Links
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50 font-medium">
              Easy to Share
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0">
          <Button
            onClick={() => onOpen()}
            size="lg"
            className="gap-2 shadow-sm"
          >
            <IconLink size={18} />
            Shorten new URL
          </Button>
        </div>
      </div>

      <GridPatternBackground />
      <div
        className="from-background to-background dark:from-background dark:to-background pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent dark:via-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
