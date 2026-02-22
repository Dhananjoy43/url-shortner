import { create } from "zustand";

import { LinkDetailsPros, ShortlinksProps } from "@/features/links/types";

interface UpdateLinkStore {
  isOpen: boolean;
  link: ShortlinksProps | LinkDetailsPros | null;
  onOpen: (link: ShortlinksProps | LinkDetailsPros) => void;
  onClose: () => void;
}

export const useUpdateLinkStore = create<UpdateLinkStore>((set) => ({
  isOpen: false,
  link: null,
  onOpen: (link) => set({ isOpen: true, link }),
  onClose: () => set({ isOpen: false, link: null }),
}));
