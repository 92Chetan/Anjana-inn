export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import Hero from '@/components/home/Hero';
import Map from '@/components/home/Map';
import Review from '@/components/home/Review';
import About from '@/components/home/About';

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <About />
      <Review />
      <Map />
    </React.Fragment>
  );
};

export default Home;
