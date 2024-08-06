import { create } from "zustand";

interface ModelStore {
  isOpen: boolean;
  isLogin: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useModel = create<ModelStore>((set) => ({
  isOpen: false,
  isLogin: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isLogin: !state.isLogin })),
}));
