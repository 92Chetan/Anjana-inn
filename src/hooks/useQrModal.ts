/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface QrModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: React.RefObject<HTMLCanvasElement>;
  setData(data: React.RefObject<HTMLCanvasElement>): void;
}

export const useQrModal = create<QrModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {} as React.RefObject<HTMLCanvasElement>,
  setData: (data) => {
    set({ data });
  }
}));
