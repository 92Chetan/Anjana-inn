'use client';
import React, { useCallback } from 'react';
import Container from '../utils/Container';
import { Concert_One, Open_Sans, Roboto } from 'next/font/google';
import { makePayment } from '@/lib/razpayIntialize';

type timelineEnum = 'daily' | 'monthly' | 'quarterly' | 'annual';

interface PlaneCardProps {
  title: string;
  service: string;
  price: number;
  timeline: timelineEnum;
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

const PlaneCard: React.FC<PlaneCardProps> = ({ price, service, title, timeline }) => {
  const pay = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    makePayment();
  }, []);

  return (
    <div className="w-80 h-fit dark:bg-zinc-800 bg-zinc-300 shadow-md dark:shadow-black/80 shadow-gray-400 rounded-lg">
      <Container className="flex my-10 flex-col">
        <h1 className={`${Concert.className} text-3xl capitalize`}>{title}</h1>
        <p className={`${Open.className} pt-4 leading-5 tracking-tight`}>{service}</p>
        <div className={`${Ro.className} flex justify-center my-8 flex-col`}>
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
        <button
          className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-green-900 mt-6 px-4 py-2 rounded-lg tracking-wide text-white active:scale-95 active:-translate-y-1 active:transition-all active:duration-75"
          onClick={(e) => pay(e)}
        >
          <span className="ml-2 text-center w-full">Book Now</span>
        </button>
      </Container>
    </div>
  );
};

export default PlaneCard;
