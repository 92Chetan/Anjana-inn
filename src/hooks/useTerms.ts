/* eslint-disable no-unused-vars */
import { qrData } from '@/components/utils/SelectPlans';
import { create } from 'zustand';

interface TermsProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: qrData | null;
  setData(data: qrData | null): void;
}

export const useTermsModal = create<TermsProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {} as qrData,
  setData: (data) => {
    set({ data });
  }
}));
