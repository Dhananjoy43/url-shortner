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
              <Card className="border-border/60 bg-card/60 w-full">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="rounded-full">
                    {s.step}
                  </Badge>
                  <h3 className="mt-3 font-medium">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {
                      "Follow the guided flow to shorten links and start measuring results with real-time analytics."
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          id="api"
          className="mx-auto mt-10 max-w-3xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-4 md:p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  API snippet
                </span>
                <Badge variant="secondary" className="rounded-full">
                  curl
                </Badge>
              </div>
              <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
                <code>
                  {
                    'curl -X POST https://api.shortly.dev/links \\\n  -H \'Authorization: Bearer $SHORTLY_API_KEY\' \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{"url":"https://example.com/your-long-url","slug":"launch"}\''
                  }
                </code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
