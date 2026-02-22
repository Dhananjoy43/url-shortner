"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section id="docs" className="border-border/60 border-t py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold md:text-4xl">How it works</h2>
          <p className="text-muted-foreground mt-3">
            Create your first short link in seconds and track performance
            instantly.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { step: "01", title: "Paste your long URL" },
            { step: "02", title: "Customize slug & domain" },
            { step: "03", title: "Track performance" },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex"
            >
              <Card className="border-border/60 bg-card/60 hover:border-primary/40 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.2)]">
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 font-mono"
                  >
                    {s.step}
                  </Badge>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {
                      "Follow the guided flow to shorten links and start measuring results with real-time analytics."
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
