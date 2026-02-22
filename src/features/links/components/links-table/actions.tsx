"use client";

import { useState } from "react";
import {
  IconChartBar,
  IconEdit,
  IconQrcode,
  IconTrash,
} from "@tabler/icons-react";
import { MoreHorizontal } from "lucide-react";

import { env } from "@/lib/env";
// import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ShortlinksProps } from "../../types";
import { QRCodeDialog } from "./qr-code-dialog";

export const Actions = (notice: ShortlinksProps) => {
  //   const updateNoticeStore = useUpdateNoticeStore();
  //   const deleteNoticeMutation = useDeleteNotice(notice.id);
  const isPending = false;
  const [isQrOpen, setIsQrOpen] = useState(false);

  const shortUrl = `${env.NEXT_PUBLIC_BASE_URL}/${notice.slug}`;

  //   const [ConfirmDialog, confirm] = useConfirm(
  //     "Are you sure?",
  //     "You are about to delete this notice.",
  //     "destructive"
  //   );

  const handleDeleteNotice = async () => {
    // const ok = await confirm();
    // if (ok) {
    //   deleteNoticeMutation.mutate();
    // }
  };

  const handleUpdateNotice = () => {
    // updateNoticeStore.notice = notice;
    // updateNoticeStore.onOpen();
  };

  return (
    <>
      <QRCodeDialog
        url={shortUrl}
        title={notice.title || "Untitled Link"}
        open={isQrOpen}
        onOpenChange={setIsQrOpen}
      />
      {/* <ConfirmDialog /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsQrOpen(true)}>
            <IconQrcode />
            QR Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdateNotice}>
            <IconChartBar />
            Analytics
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdateNotice}>
            <IconEdit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteNotice}
          >
            <IconTrash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
