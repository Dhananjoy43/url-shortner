"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { BackgroundRippleEffect } from "@/components/aceternity/background-ripple-effect";

import { DemoBox } from "./hero-demo";

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
        <div className="mx-auto max-w-3xl pt-20 pb-10 text-center md:pt-28">
          <motion.h1
            id="hero-title"
            className="text-4xl leading-tight font-semibold tracking-tight text-balance md:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shortly. Track. Scale.
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-4 text-base text-pretty md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            A lightning-fast, AI-powered short URL platform built for
            performance and analytics.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button asChild>
              <a href="#get-started">Get Started</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#pricing">View Pricing</a>
            </Button>
          </motion.div>

          <div className="text-muted-foreground mt-4 flex items-center justify-center text-xs">
            <span className="bg-muted rounded px-2 py-1">
              Press ⌘K / Ctrl K to search
            </span>
          </div>
        </div>

        <DemoBox />
      </div>
    </section>
  );
}
