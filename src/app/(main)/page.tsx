import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";
import { CTAStrip } from "@/components/landing/cta-strip";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LogosMarquee } from "@/components/landing/logos-marquee";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";

export default async function HomePage() {
  const { session } = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
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
