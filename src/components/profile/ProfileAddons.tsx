'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { addOnsBill } from '@/lib/api/addOnsBill';
import { useBillQr } from '@/hooks/useBillQr';
import toast from 'react-hot-toast';
import BillQrModal from '../utils/BillQrModal';
import Loader from '../utils/Loader';

interface ProfileAddonsProps {
  wifiPrice: number;
  electricityPrice: number;
  id: string;

  wifiTaken: Boolean | undefined | null;
}

const ProfileAddons: React.FC<ProfileAddonsProps> = ({
  wifiPrice,
  electricityPrice,
  id,
  wifiTaken
}) => {
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    if (wifiTaken) {
      setPrice(electricityPrice);
    } else {
      setPrice(wifiPrice + electricityPrice);
    }
  }, [wifiPrice, electricityPrice, wifiTaken]);

  const { onOpen } = useBillQr();
  const { data, mutate, isError, error, isSuccess, isPending } = useMutation({
    mutationKey: ['bilqr'],
    mutationFn: addOnsBill
  });

  const handlePayment = useCallback(() => {
    mutate({ price, id });
  }, [id, mutate, price]);

  useEffect(() => {
    console.log('Data from mutation:', data);
    if (isSuccess) {
      onOpen();
    }
  }, [data, isSuccess, onOpen]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [error?.message, isError]);

  return (
    <React.Fragment>
      <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full rounded-xl h-[150px] flex justify-between py-2 items-center flex-col">
        <h1> Bills</h1>
        {!wifiTaken && (
          <div className="flex justify-between items-center w-full px-3">
            <h3>wifi Bill</h3>
            <p>&#8377;{wifiPrice}</p>
          </div>
        )}
        <div className="flex justify-between items-center w-full px-3">
          <h3>Electricity Bill</h3>
          <p>&#8377;{electricityPrice}</p>
        </div>
        <hr />
        <div className="flex justify-between items-center w-full px-3">
          <h3>Total Price</h3>
          <p>&#8377;{price}</p>
        </div>
        <Button onClick={handlePayment}>{isPending ? <Loader /> : 'Pay now'}</Button>
      </div>

      {data && <BillQrModal data={data} />}
    </React.Fragment>
  );
};

export default ProfileAddons;
