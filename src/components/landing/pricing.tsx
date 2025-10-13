"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    price: "Free",
    cta: "Start Free",
    features: ["1,000 clicks / mo", "Basic analytics", "1 project"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9/mo",
    cta: "Upgrade to Pro",
    features: [
      "100k clicks / mo",
      "Advanced analytics",
      "Custom domains",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cta: "Contact Sales",
    features: ["Unlimited scale", "SSO & roles", "SLA & support", "Audit logs"],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-border/60 border-t py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground mt-3">
            Start free. Upgrade when you scale.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={[
                  "border-border/60 bg-card/60 h-full",
                  t.highlighted ? "ring-primary ring-2" : "",
                ].join(" ")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{t.name}</span>
                    <span className="text-lg font-semibold">{t.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex h-full flex-col justify-between gap-6">
                  <ul className="space-y-2 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={t.highlighted ? "default" : "secondary"}
                    asChild
                  >
                    <a href="#get-started">{t.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
