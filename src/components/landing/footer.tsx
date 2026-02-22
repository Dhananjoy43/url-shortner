import Link from "next/link";
import { IconLink } from "@tabler/icons-react";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2"
            aria-label="Home"
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl shadow-sm">
              <IconLink className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Shortly
            </span>
          </Link>
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
            A lightning-fast, advanced short URL platform built for performance
            and deep real-time analytics.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
            <li>
              <a
                href="#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#docs"
                className="hover:text-foreground transition-colors"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="#api"
                className="hover:text-foreground transition-colors"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Follow</h4>
          <ul className="text-muted-foreground mt-4 flex items-center gap-4">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="X/Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border/60 border-t py-6">
        <div className="text-muted-foreground container mx-auto px-4 text-center text-xs">
          © {new Date().getFullYear()} Shortly, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
