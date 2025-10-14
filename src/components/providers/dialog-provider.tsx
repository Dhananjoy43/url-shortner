"use client";

import { useMountedState } from "react-use";

import { ShortenLinkDialog } from "@/features/links/components/shorten-link-dialog";

export const DialogProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <ShortenLinkDialog />
    </>
  );
};
