import { CTAStrip } from "@/components/landing/cta-strip";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LogosMarquee } from "@/components/landing/logos-marquee";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";

export default function Page() {
  return (
    <main>
      <Hero />
      <LogosMarquee />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTAStrip />
    </main>
  );
}
