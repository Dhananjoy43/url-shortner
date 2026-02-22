"use client";

import { useCallback, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ModeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleClick = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return null;
  }

  // Hydration-safe fallback
  if (!resolvedTheme) {
    return (
      <button
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "relative overflow-hidden"
        )}
        aria-label="Toggle theme"
        suppressHydrationWarning
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleClick}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "relative overflow-hidden",
            className
          )}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          suppressHydrationWarning
        >
          {/* Sun */}
          <SunIcon
            className={cn(
              "absolute size-5 transform-gpu transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
              isDark
                ? "scale-75 rotate-90 opacity-0"
                : "scale-105 rotate-0 opacity-100"
            )}
          />

          {/* Moon */}
          <MoonIcon
            className={cn(
              "absolute size-5 transform-gpu transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
              isDark
                ? "scale-105 rotate-0 opacity-100"
                : "scale-75 -rotate-90 opacity-0"
            )}
          />

          <span className="sr-only">Switch Theme</span>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          Switch to {isDark ? "light" : "dark"} theme
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
