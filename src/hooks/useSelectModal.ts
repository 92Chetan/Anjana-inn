import { create } from 'zustand';

interface SelectModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSelectModal = create<SelectModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
