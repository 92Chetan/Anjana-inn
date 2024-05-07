'use client';

import { Subscription } from '@/lib/Pricing';
import React, { useState } from 'react';
import PlaneCard from './PlaneCard';
import RippleButton from './RepleButton';

type timeline = 'daily' | 'monthly' | 'quarterly' | 'annual';

const timelineArray: timeline[] = ['daily', 'monthly', 'quarterly', 'annual'];

const CardContainer = () => {
  const [planTimeline, setPlanTimeline] = useState<timeline>('monthly');
  return (
    <div className="w-full h-full flex items-center flex-col gap-20">
      <div className="h-fit flex md:flex-nowrap flex-wrap max-md:justify-center">
        {timelineArray.map((time, index) => (
          <RippleButton
            planTimeline={planTimeline}
            setPlanTimeline={setPlanTimeline}
            text={time as timeline}
            key={index}
          />
        ))}
      </div>
      <div className="grid mb-20 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
        {Subscription.map((sub, index) => {
          if (planTimeline === sub.timeline) {
            return (
              <PlaneCard
                key={index}
                title={sub.typeofRoom}
                price={sub.electricityBill + sub.furnishedCharge + sub.price + sub.water + sub.wifi}
                service={sub.service}
                timeline={sub.timeline}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default CardContainer;
