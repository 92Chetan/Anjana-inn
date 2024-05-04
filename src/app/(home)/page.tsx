import React from 'react';
import Hero from '@/components/home/Hero';
import Map from '@/components/home/Map';
import Review from '@/components/home/Review';

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Review />
      <Map />
    </React.Fragment>
  );
};

export default Home;
