'use client';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useState } from 'react';
import Script from 'next/script';
import { Concert_One, Open_Sans, Roboto } from 'next/font/google';
import { GoDotFill } from 'react-icons/go';
import { Range } from 'react-date-range';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

import Container from '../utils/Container';
import { makePayment } from '@/lib/razpayIntialize';
import { roomType, serviceType, timeline } from '@/types/types';

const Calender = dynamic(() => import('./Calender'), {
  loading: () => <p>Loading...</p>
});

interface PlaneCardProps {
  title: string;
  service: serviceType[];
  price: number;
  timeline: timeline;
  roomType?: roomType[];
  id: string;
  entity: 'order' | 'subscription';
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
  id,
  roomType,
  entity
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

  const { status } = useSession();
  const route = useRouter();

  const differentBetweenDays =
    moment(range[0].endDate).diff(moment(range[0].startDate), 'days') + 1;

  // eslint-disable-next-line no-unused-vars
  const totalPrice = useMemo(() => {
    const total = price + checked * differentBetweenDays + room * differentBetweenDays;
    setTotal(total);
  }, [checked, price, room, differentBetweenDays]);

  const calculatedPrice = timeline === 'daily' ? price * 100 : total * 100;

  const pay = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (status === 'unauthenticated') {
        return route.push('/login?redirect=/plans');
      } else if (entity === 'subscription') makePayment({ entity, plan_id: id });
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
          makePayment({
            entity,
            price: calculatedPrice,
            start_at: moment().unix(),
            end_at: moment().add(1, 'day').unix(),
            addon: checked ? true : false
          });
        }
      }
    },
    [calculatedPrice, checked, entity, id, route, status, timeline]
  );

  return (
    <React.Fragment>
      <div className="w-80 h-fit dark:bg-zinc-800 bg-zinc-300 shadow-md dark:shadow-black/80 shadow-gray-400 rounded-lg">
        <Container className="flex my-4 flex-col gap-2">
          <h1 className={`${Concert.className} text-3xl capitalize pb-4`}>{title}</h1>
          {timeline === 'custom' && (
            <select
              className="h-10 pl-2 rounded-md"
              defaultValue="--Select room--"
              onChange={(e) => {
                if (room !== 0) {
                  setRoom(0), setRoom(Number(e.target.value));
                } else {
                  setRoom(Number(e.target.value));
                }
              }}>
              <option disabled>--Select room--</option>
              {roomType?.map((room, index) => (
                <option
                  key={index}
                  value={differentBetweenDays * room.price}
                  className="capitalize">
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
                      onChange={(e) => {
                        if (e.target.checked) {
                          setChecked(differentBetweenDays * ser.value);
                        } else {
                          setChecked(0);
                        }
                      }}
                    />
                  ) : (
                    <GoDotFill className=" inline-block" size={20} />
                  )}
                  <span
                    className={`${Open.className} uppercase ${timeline === 'custom' && ser.title === 'wifi' && 'pl-[6px]'}`}>
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
            onClick={(e) => pay(e)}
            disabled={timeline === 'custom' && room === 0}>
            <span className="ml-2 text-center w-full">Book Now</span>
          </button>
        </Container>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </React.Fragment>
  );
};

export default PlaneCard;
