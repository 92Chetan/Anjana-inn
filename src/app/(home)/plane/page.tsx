import Container from '@/components/utils/Container';
import React from 'react';
import { Bebas_Neue } from 'next/font/google';
import CardContainer from '@/components/plane/CardContainer';

const BebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

const page = () => {
  return (
    <div className="h-full w-full">
      <h1
        className={`${BebasNeue.className} text-5xl leading-none tracking-normal py-12 text-center`}
      >
        Planes and Pricing
      </h1>
      <Container className="flex justify-center overflow-hidden">
        <CardContainer />
      </Container>
    </div>
  );
};

export default page;
