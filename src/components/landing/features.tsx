"use client";

import {
  BarChart3,
  Blocks,
  Brain,
  ShieldCheck,
  Users2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    icon: Zap,
    title: "Blazing Fast Edge Redirects",
    desc: "Global edge network for instant resolution and uptime.",
  },
  {
    icon: ShieldCheck,
    title: "Custom Domains",
    desc: "Bring your brand with SSL, redirects, and DNS checks.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track clicks, referrers, geo, device, and campaigns.",
  },
  {
    icon: Brain,
    title: "AI-based Link Insights",
    desc: "Automatic UTM suggestions and anomaly detection.",
  },
  {
    icon: Blocks,
    title: "Developer API",
    desc: "REST and SDKs for effortless integration.",
  },
  {
    icon: Users2,
    title: "Team Workspaces",
    desc: "Roles, SSO, approvals, and shared analytics.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-border/60 border-t py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center text-2xl font-semibold text-balance md:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything you need to grow
        </motion.h2>
        <motion.p
          className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          From edge-speed redirects to AI insights—built for modern teams.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="border-border/60 bg-card/60 h-full">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
