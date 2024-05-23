'use client';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
// import Script from 'next/script';
import { Concert_One, Open_Sans, Roboto } from 'next/font/google';
import { GoDotFill } from 'react-icons/go';
import { Range } from 'react-date-range';
// import { useRouter } from 'next/navigation';
import moment from 'moment';

import Container from '../utils/Container';
// import { makePayment } from '@/lib/razpayIntialize';
import { SafeUser, roomType, serviceType, timeline } from '@/types/types';
import Loading from '@/app/loading';

const Calender = dynamic(() => import('./Calender'), {
  loading: () => <Loading />
});

interface PlaneCardProps {
  title: string;
  service: serviceType[];
  price: number;
  timeline: timeline;
  originalPrice?: number | null;
  roomType?: roomType[];
  id: string;
  entity: 'order' | 'subscription';

  userData: SafeUser | null | undefined;
}

const Concert = Concert_One({
  weight: '400',
  subsets: ['latin']
});

const Open = Open_Sans({
  weight: '500',
  subsets: ['latin']
});

const Ro = Roboto({
  weight: '500',
  subsets: ['latin']
});

const PlaneCard: React.FC<PlaneCardProps> = ({
  price,
  service,
  title,
  timeline,
  // id,
  roomType,
  // entity,
  // userData,
  originalPrice
}) => {
  const [checked, setChecked] = useState<number>(0);
  const [room, setRoom] = useState<number>(0);
  const [total, setTotal] = useState<number>(price);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // const route = useRouter();

  // const calculatedPrice = timeline === 'daily' ? price * 100 : total * 100;

  // eslint-disable-next-line no-unused-vars
  // const pay = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     if (!userData) {
  //       return route.push('/login?redirect=/plans');
  //     } else if (entity === 'subscription') makePayment({ entity, plan_id: id });
  //     else {
  //       if (timeline === 'daily') {
  //         makePayment({
  //           entity,
  //           price: calculatedPrice,
  //           start_at: moment().unix(),
  //           end_at: moment().add(1, 'day').unix(),
  //           addon: true
  //         });
  //       } else if (timeline === 'custom') {
  //         makePayment({
  //           entity,
  //           price: calculatedPrice,
  //           start_at: moment(range[0].startDate).unix(),
  //           end_at: moment(range[0].endDate).unix(),
  //           addon: checked ? true : false
  //         });
  //         setChecked(0);
  //         setRoom(0);
  //         setTotal(0);
  //         setRange([{ startDate: new Date(), endDate: new Date() }]);
  //         const checkbox = document.getElementById('checkboxId') as HTMLInputElement;
  //         if (checkbox) {
  //           checkbox.checked = false;
  //         }
  //         const select = document.getElementById('selectId') as HTMLSelectElement;
  //         if (select) {
  //           select.selectedIndex = 0;
  //         }
  //       }
  //     }
  //   },
  //   [calculatedPrice, checked, entity, id, range, route, timeline, userData]
  // );

  useEffect(() => {
    const differentBetweenDays =
      moment(range[0].endDate).diff(moment(range[0].startDate), 'days') + 1;

    const totalWifiPrice = checked * differentBetweenDays;
    const totalRoomPrice = room * differentBetweenDays;

    const total = price + totalWifiPrice + totalRoomPrice;

    setTotal(total);
  }, [checked, price, room, range]);

  const OnSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(Number(e.target.value));
  }, []);

  const onChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>, ser: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setChecked(ser.value);
    } else {
      setChecked(0);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="w-80 h-fit dark:bg-zinc-800 bg-zinc-300 shadow-md dark:shadow-black/80 shadow-gray-400 rounded-lg">
        <Container className="flex my-4 flex-col gap-2">
          <h1 className={`${Concert.className} text-3xl capitalize pb-4`}>{title}</h1>
          {timeline === 'custom' && (
            <select
              className="h-10 pl-2 rounded-md"
              defaultValue="--Select room--"
              onChange={(e) => OnSelect(e)}
              id="selectId"
            >
              <option disabled>--Select room--</option>
              {roomType?.map((room, index) => (
                <option key={index} value={room.price} className="capitalize">
                  {room.title}
                </option>
              ))}
            </select>
          )}

          {timeline === 'custom' && (
            <Calender value={range} onChange={(value) => setRange([value.selection])} />
          )}
          {service.map((ser, index) => (
            <div key={index}>
              {ser.value && (
                <div className="flex gap-1 items-center">
                  {timeline === 'custom' && ser.title === 'wifi' ? (
                    <input
                      type="checkbox"
                      name="wifi"
                      id="checkboxId"
                      onChange={(e) => {
                        onChecked(e, ser);
                      }}
                    />
                  ) : (
                    <GoDotFill className=" inline-block" size={20} />
                  )}
                  <span
                    className={`${Open.className} uppercase ${timeline === 'custom' && ser.title === 'wifi' && 'pl-[6px]'}`}
                  >
                    {ser.title}
                  </span>
                </div>
              )}
            </div>
          ))}
          {timeline === 'custom' ? (
            <div className="flex">
              <span className="text-[12px]">&#8377;</span>
              <h1 className="text-2xl">{total}</h1>
            </div>
          ) : (
            <div className={`${Ro.className} flex justify-center my-4 flex-col`}>
              <p>Start at</p>
              {originalPrice && (
                <div className="flex line-through text-gray-600">
                  <span className="text-[10px]">&#8377;</span>
                  <h1 className="text-xl">{originalPrice}</h1>
                </div>
              )}
              <div className="flex">
                <span className="text-[12px]">&#8377;</span>
                <h1 className="text-2xl">{price}</h1>
              </div>
              <p>
                {timeline === 'daily' && 'for a day'}
                {timeline === 'monthly' && '/month'}
                {timeline === 'quarterly' && '/3 month'}
                {timeline === 'annual' && '/year'}*
              </p>
            </div>
          )}

          <p className="text-sm leading-none tracking-tighter">Read the terms and conditions.</p>
          <button
            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium disabled:bg-green-700 bg-green-900 mt-6 px-4 py-2 rounded-lg tracking-wide text-white active:scale-95 active:-translate-y-1 active:transition-all active:duration- disabled:animate-none"
            // onClick={(e) => pay(e)}
            // disabled={timeline === 'custom' && room === 0}>
            onClick={() =>
              window.open('https://wa.me/6260849824?text=Any one there i want help', '_blank')
            }
          >
            <span className="ml-2 text-center w-full">Message now</span>
          </button>
        </Container>
      </div>
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" /> */}
    </React.Fragment>
  );
};

export default PlaneCard;
