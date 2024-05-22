'use client';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useBillQr } from '@/hooks/useBillQr';
import Image from 'next/image';

const BillQrModal = ({ data }: { data: string }) => {
  const { isOpen, onClose } = useBillQr();

  return (
    <Dialog onOpenChange={onClose} modal open={isOpen}>
      <DialogContent className="sm:max-w-[425px] w-full flex justify-center items-center flex-col">
        <DialogHeader>
          <DialogTitle>QR code</DialogTitle>
          <Image src={data} id="qrCanvas" alt="qr" width="300" height="300" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BillQrModal;
