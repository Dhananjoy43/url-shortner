"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Link2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function DemoBox() {
  const samples = useMemo(
    () => [
      "https://vercel.com/docs/analytics?utm_campaign=vercel",
      "https://linear.app/changelog/automation-2025",
      "https://dub.co/features?ref=shortly",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "ready" | "shortened">(
    "typing"
  );
  const [shortUrl, setShortUrl] = useState("https://sho.rt/ai-42b9");

  const typingRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "typing") return;
    const target = samples[index % samples.length];
    let i = 0;
    typingRef.current = window.setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        window.clearInterval(typingRef.current!);
        setTimeout(() => setPhase("ready"), 600);
      }
    }, 12);
    return () => {
      if (typingRef.current) window.clearInterval(typingRef.current);
    };
  }, [index, phase, samples]);

  function onShorten() {
    // fake "generation"
    setPhase("shortened");
  }

  function onReset() {
    setText("");
    setShortUrl(randomShort());
    setPhase("typing");
    setIndex((v) => v + 1);
  }

  function randomShort() {
    const slug = Math.random().toString(36).slice(2, 8);
    return `https://sho.rt/${slug}`;
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto max-w-3xl pb-20",
        "supports-[backdrop-filter]:backdrop-blur-md"
      )}
    >
      <Card className="border-border/50 bg-card/60">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Live demo
              </Badge>
              <span className="text-muted-foreground text-xs">
                Try it below
              </span>
            </div>

            <div className="flex flex-col items-stretch gap-3 md:flex-row">
              <div className="relative flex-1">
                <Input
                  aria-label="Long URL"
                  placeholder="Paste your long URL"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-3 hidden items-center md:flex">
                  <Link2 size={16} aria-hidden="true" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={onShorten} disabled={phase === "typing"}>
                  Shorten
                </Button>
                <Button variant="outline" onClick={onReset}>
                  Reset
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {phase === "shortened" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="border-border bg-card mt-2 rounded-md border p-3 md:p-4">
                    <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-primary h-2 w-2 rounded-full"
                          aria-hidden="true"
                        />
                        <span className="font-medium">{shortUrl}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button size="sm" asChild>
                          <a href="#get-started">Get Started</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
