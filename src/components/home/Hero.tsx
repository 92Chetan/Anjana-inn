'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { HeroImage } from '@/lib/utils';

const Hero = () => {
  return (
    <React.Fragment>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        modules={[Autoplay]}
        className="w-full h-fit transition-all ease-in-out duration-75"
      >
        {HeroImage.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              priority
              layout="responsive"
              alt="building_1"
              className="object-cover"
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  );
};

export default Hero;
