"use client";

import { FC, ReactNode } from "react";
import { Copy, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QRCodeDialogProps {
  url: string;
  title: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export const QRCodeDialog: FC<QRCodeDialogProps> = ({
  url,
  title,
  open,
  onOpenChange,
  children,
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(url);
    toast.success("URL copied to clipboard");
  };

  const handleDownload = () => {
    const svg = document.getElementById(`qr-code-${url}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${title}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code or download it to share the link for {title}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="rounded-xl border bg-white p-4">
            <QRCodeSVG
              id={`qr-code-${url}`}
              value={url}
              size={200}
              level={"H"}
              marginSize={2}
            />
          </div>
          <div className="flex justify-center gap-2">
            <Button type="button" variant="secondary" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
            <Button type="button" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
