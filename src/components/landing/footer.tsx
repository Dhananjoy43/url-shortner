import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#docs">Docs</a>
            </li>
            <li>
              <a href="#api">API</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <Link href="#">Privacy</Link>
            </li>
            <li>
              <Link href="#">Terms</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Follow</h4>
          <ul className="text-muted-foreground mt-3 flex items-center gap-3">
            <li>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href="#" aria-label="X/Twitter">
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </Link>
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
