"use client";

import { FC, useEffect, useRef, useState } from "react";
import { IconChartBar } from "@tabler/icons-react";
import { format } from "date-fns";
import { CheckCheck, Copy, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LinkDetailsPros } from "@/features/links/types";

interface LinkDetailsCardProps {
  link: LinkDetailsPros;
  index: number;
  onAnalytics?: (slug: string) => void; // Callback for Analytics button
}

export const LinkDetailsCard: FC<LinkDetailsCardProps> = ({
  index,
  link,
  onAnalytics,
}) => {
  const { id, slug, title, destinationUrl, clicks, createdAt } = link;

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = async (shortUrl: string) => {
    try {
      copyToClipboard(shortUrl);
      toast.success("Short link copied!");
      setCopied(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const shortUrl = `${env.NEXT_PUBLIC_BASE_URL}/${slug}`;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className="group"
    >
      <Card
        className={cn(
          "relative h-full gap-0 overflow-hidden border backdrop-blur-2xl transition-all duration-300",
          "hover:scale-[1.02] hover:shadow-[0_8_32px_0_rgba(59,130,246,0.15)]"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="truncate text-base font-semibold capitalize">
              {title || "Untitled Link"}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/80 hover:text-primary block truncate text-sm break-all transition-colors"
          >
            {destinationUrl}
          </a>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Short Link
            </p>
            <div className="bg-muted/20 flex items-center justify-between gap-2 rounded-lg border p-3 transition-colors">
              <p className="text-muted-foreground truncate font-mono text-sm">
                {shortUrl}
              </p>

              <div className="flex flex-shrink-0 items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleCopy(shortUrl)}
                  className={cn(
                    "cursor-copy transition-all",
                    copied && "bg-emerald-400/10 text-emerald-400"
                  )}
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>

                <Button size="icon" variant="ghost" asChild>
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                {onAnalytics && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onAnalytics(slug)}
                    title="View Analytics"
                    className="cursor-pointer"
                  >
                    <IconChartBar />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs text-gray-500">
            <span className="font-medium">
              {clicks ?? 0} {clicks === 1 ? "click" : "clicks"}
            </span>
            <span>{format(new Date(createdAt), "PPP, hh:mm a")}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
