import { cn } from '@/lib/utils';
import { Bebas_Neue } from 'next/font/google';
import React from 'react';

const BebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

const Heading = ({ heading, className }: { heading: string; className?: string }) => {
  return (
    <h1
      className={cn(
        `${BebasNeue.className} md:text-5xl text-3xl leading-none tracking-normal text-center underline`,
        className
      )}
    >
      {heading}
    </h1>
  );
};

export default Heading;
