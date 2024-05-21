import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { SelectForm } from '../utils/SelectPlans';
import { useSelectModal } from '@/hooks/useSelectModal';

interface QrCodeProps {
  user_id: string | undefined;
}

const QrCode: React.FC<QrCodeProps> = ({ user_id }) => {
  const { isOpen, onClose } = useSelectModal();
  return (
    <React.Fragment>
      <Dialog open={isOpen} onOpenChange={onClose} modal>
        <DialogContent className="sm:max-w-[425px] w-full flex justify-center items-center flex-col overflow-scroll">
          <SelectForm user_id={user_id} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default QrCode;
