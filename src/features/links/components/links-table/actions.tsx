"use client";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

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

export const Actions = (notice: ShortlinksProps) => {
  //   const updateNoticeStore = useUpdateNoticeStore();
  //   const deleteNoticeMutation = useDeleteNotice(notice.id);
  const isPending = false;

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
          <DropdownMenuItem onClick={handleUpdateNotice}>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteNotice}
          >
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
