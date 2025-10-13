"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Command, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { CommandMenu } from "./command-menu";

export function Navbar() {
  const links = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#docs", label: "Docs" },
    { href: "#api", label: "API" },
    { href: "#login", label: "Login" },
  ];

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "border-border/50 sticky top-0 z-50 border-b",
        "bg-background/60 supports-[backdrop-filter]:backdrop-blur-md"
      )}
      role="banner"
    >
      <div
        aria-hidden="true"
        className="bg-primary/70 h-[2px]"
        style={{ width: `${progress}%` }}
      />
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <div className="bg-primary h-5 w-5 rounded-sm" aria-hidden="true" />
          <span className="font-semibold tracking-tight">Shortly</span>
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="text-muted-foreground flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu.Trigger>
            <Button
              variant="ghost"
              size="sm"
              className="hidden items-center gap-2 md:inline-flex"
            >
              <Command className="h-4 w-4" aria-hidden="true" />
              <span>Search</span>
              <span className="bg-muted text-muted-foreground ml-1 hidden items-center gap-1 rounded px-1.5 py-0.5 text-xs md:flex">
                ⌘K
              </span>
            </Button>
          </CommandMenu.Trigger>

          <ThemeToggle />
          <Button asChild size="sm">
            <a href="#get-started">Get Started</a>
          </Button>
        </div>
      </div>

      <CommandMenu />
    </header>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-8 w-8"
    >
      <Sun className="h-[18px] w-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[18px] w-[18px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
