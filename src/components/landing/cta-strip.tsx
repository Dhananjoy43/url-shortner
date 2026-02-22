import { Button } from "@/components/ui/button";

import { GridPatternBackground } from "../aceternity/grid-pattern-background";

export function CTAStrip() {
  return (
    <section aria-label="Get Started" className="py-20">
      <div className="relative container mx-auto px-4">
        <GridPatternBackground />
        <div className="relative overflow-hidden rounded-3xl border px-6 py-16 text-center shadow-2xl md:px-12 md:py-16">
          <div className="from-primary/20 via-background/0 to-background/0 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
          <h2 className="text-foreground text-3xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-5xl">
            Start tracking every click
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-balance md:text-xl">
            Join thousands of teams who build their brands with fast, reliable
            link management and deep real-time analytics.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 w-full px-8 text-base font-medium transition-all hover:scale-105 sm:w-auto"
              asChild
            >
              <a href="/dashboard">Get Started for Free</a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 w-full px-8 text-base font-medium sm:w-auto"
              asChild
            >
              <a href="#features">See all Features</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
