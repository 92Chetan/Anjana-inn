/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface BillQrProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBillQr = create<BillQrProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
