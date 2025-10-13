"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = href;
    } else {
      window.location.href = href;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => navigate("#get-started")}>
            Get Started
          </CommandItem>
          <CommandItem onSelect={() => navigate("#docs")}>Docs</CommandItem>
          <CommandItem onSelect={() => navigate("#api")}>API</CommandItem>
          <CommandItem onSelect={() => navigate("#pricing")}>
            Pricing
          </CommandItem>
          <CommandItem onSelect={() => navigate("https://github.com")}>
            GitHub
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

CommandMenu.Trigger = function Trigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [_, set] = React.useState(0);
  // no-op component, the actual open/close is handled via global keyboard; button is a visual affordance
  return <>{children}</>;
};
