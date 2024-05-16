'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

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
        className="w-full h-fit transition-all ease-in-out duration-75">
        <SwiperSlide>
          <Image
            src="/images/building_1.jpg"
            priority
            layout="responsive"
            alt="building_1"
            className="object-cover"
            width={500}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/building_2.jpg"
            priority
            layout="responsive"
            alt="building_2"
            className="object-cover"
            width={500}
            height={500}
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/building_3.jpg"
            priority
            alt="building_3"
            layout="responsive"
            className="object-cover"
            width={500}
            height={500}
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/building_4.jpg"
            priority
            alt="building_4"
            layout="responsive"
            className="object-cover"
            width={500}
            height={500}
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/building_5.jpg"
            priority
            alt="building_5"
            layout="responsive"
            className="object-cover"
            width={500}
            height={500}
            fetchPriority="high"
          />
        </SwiperSlide>
      </Swiper>
    </React.Fragment>
  );
};

export default Hero;
