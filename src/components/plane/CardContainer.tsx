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
    <React.Fragment>
      <h1
        className={`${BebasNeue.className} text-5xl leading-none tracking-normal py-12 text-center`}
      >
        Planes and Pricing
      </h1>
      <div className="flex items-center flex-col gap-y-10">
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
        <div className="flex items-center justify-center flex-wrap gap-4 pb-20">
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
    </React.Fragment>
  );
};

export default CardContainer;
