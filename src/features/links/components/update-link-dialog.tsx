"use client";

import { ResponsiveDialogDrawer } from "@/components/ui/responsive-dialog-drawer";

import { useUpdateLinkStore } from "@/features/links/store/update-link-dialog-store";

import { UpdateLinkForm } from "./update-link-form";

export function UpdateLinkDialog() {
  const { isOpen, onClose, link } = useUpdateLinkStore();

  if (!link) return null;

  return (
    <ResponsiveDialogDrawer
      open={isOpen}
      onOpenChange={onClose}
      title="Update Link"
      description="Update your short link details below."
    >
      <UpdateLinkForm link={link} />
    </ResponsiveDialogDrawer>
  );
}
