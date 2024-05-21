'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { fetchQr } from '@/lib/api/Subscription';
import { useTermsModal } from '@/hooks/useTerms';
import { useSelectModal } from '@/hooks/useSelectModal';
import { useQrModal } from '@/hooks/useQrModal';

const TermsModal = () => {
  const [accept, setAccept] = useState<boolean>(false);
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const { isOpen, onClose, data: termsdata } = useTermsModal();
  const { onClose: CloseSelect } = useSelectModal();
  const { onOpen, setData } = useQrModal();

  const { isSuccess, mutate, data } = useMutation({
    mutationFn: fetchQr,
    mutationKey: ['getQr']
  });

  const loadCanvas = async (dataURL: string, canvasContextRef: CanvasRenderingContext2D) => {
    const imageObj = new Image();
    imageObj.onload = function () {
      //@ts-ignore
      canvasContextRef.drawImage(this, 0, 0);
    };
    imageObj.src = dataURL;
  };

  const paintQR = useCallback(async () => {
    if (canvasEl.current && isSuccess) {
      const canvasContext = canvasEl.current.getContext('2d');
      if (canvasContext) {
        await loadCanvas(data as string, canvasContext);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    paintQR();
  }, [paintQR]);

  const handlePay = useCallback(() => {
    if (accept && termsdata) {
      mutate({ ...termsdata, terms: accept });
    } else {
      toast.error('Please accept terms and condition');
    }
  }, [accept, mutate, termsdata]);

  useEffect(() => {
    if (isSuccess && canvasEl) {
      CloseSelect();
      setData(canvasEl);
      onOpen();
      onClose();
    }
  }, [CloseSelect, isSuccess, onClose, onOpen, setData]);

  return (
    <Dialog onOpenChange={onClose} modal open={isOpen}>
      <DialogContent className="sm:max-w-[425px] w-full flex justify-center items-center flex-col overflow-scroll">
        <DialogHeader>
          <DialogTitle>Qr code</DialogTitle> : <DialogTitle>Terms & Condition</DialogTitle>
          <DialogDescription>
            Only wifi bill is included in the custom plan. We charge wifi and electric bills at the
            end of the month. After payment, we will provide a payment receipt, which will be
            verified by the admin upon receiving the payment amount.
          </DialogDescription>
        </DialogHeader>

        <input
          type="checkbox"
          checked={accept}
          onChange={(e) => setAccept(e.target.checked)}
          className="inline-block"
        />
        <span>Accept terms & conditions</span>

        <Button onClick={handlePay}>Scan QR code</Button>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
