import React, { SetStateAction, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { SafeUser, timeline } from '@/types/types';
import { useRouter } from 'next/navigation';
import { makePayment } from '@/lib/razpayIntialize';
import moment from 'moment';
import { Range } from 'react-date-range';
import Script from 'next/script';

interface TermsProps {
  userData: SafeUser | null | undefined;
  entity: 'order' | 'subscription';
  plan_id?: string;
  timeline: timeline;
  calculatedPrice: number;
  range?: Range[];
  checked?: number;
  setChecked?: React.Dispatch<SetStateAction<number>>;
  setRoom?: React.Dispatch<SetStateAction<number>>;
  setTotal?: React.Dispatch<SetStateAction<number>>;
  setRange?: React.Dispatch<SetStateAction<Range[]>>;
}

const Terms: React.FC<TermsProps> = ({
  userData,
  entity,
  timeline,
  calculatedPrice,
  range,
  plan_id,
  checked,
  setChecked,
  setRoom,
  setTotal,
  setRange
}) => {
  const route = useRouter();
  const pay = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!userData) {
        return route.push('/login?redirect=/');
      } else if (entity === 'subscription') makePayment({ entity, plan_id });
      else {
        if (timeline === 'daily') {
          makePayment({
            entity,
            price: calculatedPrice,
            start_at: moment().unix(),
            end_at: moment().add(1, 'day').unix(),
            addon: true
          });
        } else if (timeline === 'custom') {
          if (range && range[0]) {
            makePayment({
              entity,
              price: calculatedPrice,
              start_at: moment(range[0].startDate).unix(),
              end_at: moment(range[0].endDate).unix(),
              addon: checked ? true : false
            });
          }
          if (setRange) {
            setRange([{ startDate: new Date(), endDate: new Date() }]);
          }
          if (setChecked) setChecked(0);
          if (setRoom) setRoom(0);
          if (setTotal) setTotal(0);
          const checkbox = document.getElementById('checkboxId') as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = false;
          }
          const select = document.getElementById('selectId') as HTMLSelectElement;
          if (select) {
            select.selectedIndex = 0;
          }
        }
      }
    },
    [
      calculatedPrice,
      checked,
      entity,
      plan_id,
      range,
      route,
      setChecked,
      setRoom,
      setTotal,
      setRange,
      timeline,
      userData
    ]
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="my-7">Book now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Read terms and condition carefully</DialogTitle>
            <DialogDescription>
              Wifi and electricity bill not include here. we will charge every month
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="flex justify-center items-center py-4 gap-4">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">Agree terms & condition</label>
            </div>
            <Button onClick={pay} className="w-full">
              Pay now
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default Terms;
