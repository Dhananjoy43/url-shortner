"use client";

import { ResponsiveDialogDrawer } from "@/components/ui/responsive-dialog-drawer";

import { useShortenLinkStore } from "@/features/links/store/shorten-link-dialog-store";

import { ShortenLinkForm } from "./shorten-link-form";

export function ShortenLinkDialog() {
  const { isOpen, onClose } = useShortenLinkStore();

  return (
    <ResponsiveDialogDrawer
      open={isOpen}
      onOpenChange={onClose}
      title="Shorten a Link"
      description="Paste your long URL below, add an optional title and custom slug to
            create a short link instantly."
    >
      <ShortenLinkForm />
    </ResponsiveDialogDrawer>
  );
}
