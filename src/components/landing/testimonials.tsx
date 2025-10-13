"use client";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Growth Lead, Finly",
    quote:
      "Shortly became our go-to for campaign links. The analytics are instant and accurate.",
    initials: "AC",
  },
  {
    name: "Riya Patel",
    role: "PM, Nova Tools",
    quote:
      "We shipped link tracking to our product in a day thanks to the API and great docs.",
    initials: "RP",
  },
  {
    name: "Marcus Lee",
    role: "Founder, ByteLink",
    quote:
      "Edge-speed redirects and custom domains sealed the deal for our global launch.",
    initials: "ML",
  },
];

export function Testimonials() {
  return (
    <section className="border-border/60 border-t py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center text-2xl font-semibold md:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Loved by modern teams
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/60 bg-card/60 h-full">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <p className="text-muted-foreground text-sm text-pretty">{`"${t.quote}"`}</p>
                  <div className="mt-auto flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
