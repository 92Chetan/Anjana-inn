'use client';
import React, { useEffect, useState } from 'react';
import { Bill } from '@prisma/client';

import PlaneCard from './PlaneCard';
import RippleButton from './RepleButton';
import { SafeUser, roomType, serviceType, timeline } from '@/types/types';
import Heading from '../utils/Heading';
import { useBill } from '@/hooks/useBill';

const timelineArray: timeline[] = ['daily', 'monthly', 'quarterly', 'annual', 'custom'];

interface CardContainerProps {
  userData: SafeUser | null | undefined;
  Subscription: Bill[] | null | undefined;
}
const CardContainer: React.FC<CardContainerProps> = ({ userData, Subscription }) => {
  const { setData } = useBill();
  const [planTimeline, setPlanTimeline] = useState<timeline>('monthly');
  useEffect(() => {
    setData(Subscription);
  }, [Subscription, setData]);
  return (
    <React.Fragment>
      <div className="lg:h-screen h-fit flex justify-center items-center flex-col" id="plans">
        <Heading heading="Plans & Pricing" className="py-12" />
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
            {Subscription?.map((sub, index) => {
              if (planTimeline === sub.timeline) {
                return (
                  <PlaneCard
                    key={index}
                    id={sub.plan_id as string}
                    title={sub.typeofRoom as string}
                    price={sub.price}
                    service={sub.service as serviceType[]}
                    timeline={sub.timeline}
                    roomType={sub.roomType as roomType[]}
                    //@ts-ignore
                    entity={sub.entity}
                    originalPrice={sub.originalPrice}
                    userData={userData}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardContainer;
