'use client';
import React, { useState } from 'react';
import { Bebas_Neue } from 'next/font/google';

import { Subscription } from '@/lib/Pricing';
import PlaneCard from './PlaneCard';
import RippleButton from './RepleButton';
import { timeline } from '@/types/types';

const BebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

const timelineArray: timeline[] = ['daily', 'monthly', 'quarterly', 'annual', 'custom'];

const CardContainer = () => {
  const [planTimeline, setPlanTimeline] = useState<timeline>('monthly');
  return (
    <React.Fragment>
      <h1
        className={`${BebasNeue.className} text-5xl leading-none tracking-normal py-12 text-center`}>
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
                  id={sub.plan_id as string}
                  title={sub.typeofRoom}
                  price={sub.price}
                  service={sub.service}
                  timeline={sub.timeline}
                  roomType={sub.roomType}
                  //@ts-ignore
                  entity={sub.entity}
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
