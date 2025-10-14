"use client";

import { ReactNode } from "react";
import { useMedia } from "react-use";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveDialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ResponsiveDialogDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ResponsiveDialogDrawerProps) {
  // Tailwind sm breakpoint → 640px
  const isDesktop = useMedia("(min-width: 640px)", false);

  if (isDesktop) {
    // Desktop → Dialog
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("px-6 sm:max-w-lg", className)}>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-center text-pretty">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile → Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          {description && (
            <DrawerDescription className="text-center">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="px-4 pb-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
