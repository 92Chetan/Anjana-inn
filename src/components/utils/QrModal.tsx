'use client';
import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useQrModal } from '@/hooks/useQrModal';

const QrModal = () => {
  const { onClose, isOpen, data } = useQrModal();

  return (
    <Dialog onOpenChange={onClose} modal open={isOpen}>
      <DialogContent className="sm:max-w-[425px] w-full flex justify-center items-center flex-col overflow-scroll">
        <DialogHeader>
          <DialogTitle>Qr code</DialogTitle>
        </DialogHeader>

        <canvas ref={data} id="qrCanvas" width="300" height="300" />
      </DialogContent>
    </Dialog>
  );
};

export default QrModal;
