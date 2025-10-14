import { create } from "zustand";

type ShortenLinkDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useShortenLinkStore = create<ShortenLinkDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
