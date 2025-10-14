"use client";

import { IconLink } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridPatternBackground } from "@/components/aceternity/grid-pattern-background";

import { useShortenLinkStore } from "@/features/links/store/shorten-link-dialog-store";

export function Banner() {
  const { onOpen } = useShortenLinkStore();
  return (
    <header className="bg-secondary relative w-full overflow-hidden rounded-xl border p-6 md:p-8">
      <div className="relative z-10 flex flex-col">
        <div className="max-w-2xl">
          <h2 className="text-left text-2xl font-bold tracking-tight">
            Welcome to <span className="text-primary">Shortly</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-pretty md:text-lg">
            Create short, shareable links in seconds. Simplify your URLs, track
            clicks, and share with ease—perfect for social media, marketing, or
            personal use.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Badge variant={"outline"} className="rounded-full px-3">
            Fast & Free
          </Badge>
          <Badge variant={"outline"} className="rounded-full px-3">
            Trackable Links
          </Badge>
          <Badge variant={"outline"} className="mr-auto rounded-full px-3">
            Easy to Share
          </Badge>
          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => onOpen()} className="cursor-pointer">
              <IconLink />
              Shorten a URL
            </Button>
          </div>
        </div>
      </div>

      {/* subtle decorative shapes using tokens, not a gradient */}
      <div
        aria-hidden="true"
        className="border-border/70 bg-card pointer-events-none absolute -top-8 -right-8 size-40 rounded-full border opacity-70"
      />
      <div
        aria-hidden="true"
        className="border-border/70 bg-card pointer-events-none absolute -bottom-10 -left-10 size-56 rounded-2xl border opacity-70"
      />
      <div
        aria-hidden="true"
        className="border-border/70 bg-card pointer-events-none absolute -right-8 -bottom-8 size-64 rounded-full border opacity-40"
      />
      <GridPatternBackground />
    </header>
  );
}
