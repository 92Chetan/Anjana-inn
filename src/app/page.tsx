export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import Hero from '@/components/home/Hero';
import Map from '@/components/home/Map';
import Review from '@/components/home/Review';
import About from '@/components/home/About';
import ContactUs from '@/components/contact/ContactUs';
import CardContainer from '@/components/plane/CardContainer';
import { getCurrentUser } from '@/action/getCurrentUser';
import { getPlans } from '@/action/getPlans';
import Log from '@/components/utils/Log';

const Home = async () => {
  const currentUser = await getCurrentUser();
  const getSubscribe = await getPlans();
  return (
    <React.Fragment>
      <Hero />
      <About />
      <CardContainer userData={currentUser} Subscription={getSubscribe} />
      <Review />
      <ContactUs />
      <Map />
      <Log />
    </React.Fragment>
  );
};

export default Home;
