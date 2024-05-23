/* eslint-disable no-unused-vars */
import { Bill } from '@prisma/client';
import { create } from 'zustand';

interface BillProps {
  data: Bill[] | undefined | null;
  setData(data: Bill[] | undefined | null): void;
}

export const useBill = create<BillProps>((set) => ({
  data: [],
  setData: (data) => {
    set({ data });
  }
}));
