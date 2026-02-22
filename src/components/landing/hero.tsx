"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { BackgroundRippleEffect } from "@/components/aceternity/background-ripple-effect";

// Import removed
export function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative" aria-labelledby="hero-title">
      <BackgroundRippleEffect />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, color-mix(in oklch, var(--color-primary) 20%, transparent), transparent 40%)`,
          maskImage:
            "radial-gradient(500px circle at center, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(500px circle at center, black, transparent 70%)",
        }}
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl py-32 text-center md:py-40">
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 text-primary ring-primary/20 hover:ring-primary/40 relative rounded-full px-4 py-1.5 text-sm leading-6 font-medium ring-1 transition-colors">
              New: Advanced link analytics{" "}
              <span aria-hidden="true">&rarr;</span>
            </div>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="from-foreground via-foreground/90 to-muted-foreground/50 bg-gradient-to-br bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-balance text-transparent sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Shorten links. Build your brand. Grow faster.
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-4 text-base text-pretty md:text-lg lg:px-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Create branded links, track clicks in real-time across the globe,
            and get deep insights into your audience behavior with our advanced
            analytics dashboard.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="px-8 text-base font-medium transition-all hover:scale-105"
              asChild
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
