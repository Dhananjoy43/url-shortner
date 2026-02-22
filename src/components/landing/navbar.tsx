"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconLink } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "../global/mode-toggle";
import { CommandMenu } from "./command-menu";

export function Navbar() {
  // const links = [
  //   { href: "#features", label: "Features" },
  //   { href: "#docs", label: "Docs" },
  //   { href: "#api", label: "API" },
  //   { href: "#login", label: "Login" },
  // ];

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
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl shadow-sm">
            <IconLink className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">Shortly</span>
        </Link>

        {/* <nav className="hidden md:block" aria-label="Primary">
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
        </nav> */}

        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <CommandMenu />
    </header>
  );
}
