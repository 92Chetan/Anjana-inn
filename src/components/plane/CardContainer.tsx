'use client';

import { Subscription } from '@/lib/Pricing';
import React, { useState } from 'react';
import PlaneCard from './PlaneCard';
import RippleButton from './RepleButton';
import { Bebas_Neue } from 'next/font/google';

const BebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

type timeline = 'daily' | 'monthly' | 'quarterly' | 'annual';

const timelineArray: timeline[] = ['daily', 'monthly', 'quarterly', 'annual'];

const CardContainer = () => {
  const [planTimeline, setPlanTimeline] = useState<timeline>('monthly');
  return (
    <div className="xl:h-screen flex justify-center items-center flex-col">
      <h1
        className={`${BebasNeue.className} text-5xl leading-none tracking-normal py-12 text-center`}
      >
        Planes and Pricing
      </h1>
      <div className="flex items-center flex-col gap-y-20">
        <div className="flex md:flex-nowrap flex-wrap max-md:justify-center">
          {timelineArray.map((time, index) => (
            <RippleButton
              planTimeline={planTimeline}
              setPlanTimeline={setPlanTimeline}
              text={time as timeline}
              key={index}
            />
          ))}
        </div>
        <div className="grid mb-20 gap-3 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
          {Subscription.map((sub, index) => {
            if (planTimeline === sub.timeline) {
              return (
                <PlaneCard
                  key={index}
                  title={sub.typeofRoom}
                  price={
                    sub.electricityBill + sub.furnishedCharge + sub.price + sub.water + sub.wifi
                  }
                  service={sub.service}
                  timeline={sub.timeline}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
