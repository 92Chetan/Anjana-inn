'use client';
import React, { useEffect } from 'react';
import Container from '../utils/Container';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Heading from '../utils/Heading';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
      anchorPlacement: 'top-bottom'
    });
  }, []);
  return (
    <div className=" h-screen overflow-hidden " id="about">
      <Container className="py-12 relative h-full flex flex-col justify-center items-center">
        <Heading heading="about" />
        <div className="flex items-center pt-10 max-md:flex-col md:gap-24 gap-6">
          <Image
            src="/images/rent_2.jpg"
            alt="hello"
            width={200}
            height={200}
            className="w-[200px] h-[200px] rounded-full"
            data-aos="fade-right"
          />
          <div className=" flex flex-col gap-4">
            <p data-aos="fade-left" data-aos-delay="200" className="md:text-2xl">
              Welcome to Anjana Inn, where comfort meets affordability for students and single
              professionals. Discover safe, convenient living spaces tailored to your needs. From
              single rooms to shared living arrangements, our flexible plans cater to daily,
              monthly, and yearly stays, all with essential amenities. Get in touch today and find
              your ideal living space with us.
              <span className="underline">serving individuals since 2017</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
