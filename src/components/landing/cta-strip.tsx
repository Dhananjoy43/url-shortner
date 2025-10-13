import { Button } from "@/components/ui/button";

export function CTAStrip() {
  return (
    <section
      aria-label="Get Started"
      className="border-border/60 border-t py-10"
    >
      <div className="container mx-auto px-4">
        <div className="border-border/60 bg-card/60 flex flex-col items-center justify-between gap-4 rounded-lg border p-5 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium">Ready to shorten smarter?</h3>
            <p className="text-muted-foreground text-sm">
              Join teams using edge-speed redirects and real-time analytics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <a href="#get-started">Get Started</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
