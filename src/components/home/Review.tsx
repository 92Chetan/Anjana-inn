'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import data from '../../../data.json';
import { ReviewType } from '@/types/types';
import Container from '../utils/Container';
import { truncateText } from '@/lib/truncateText';

const Review = () => {
  const [screenSize, setScreenSize] = useState<number>(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 600) {
        setScreenSize(2);
      } else {
        setScreenSize(1);
      }
    }

    window.addEventListener('resize', handleResize);
    // Call it on initial render
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[400px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={screenSize}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className="w-full h-full transition-all ease-in-out duration-75">
        {data.map((item: ReviewType, index: number) => (
          <SwiperSlide key={index}>
            <Container className="w-full h-full flex justify-center items-center">
              <div className="dark:bg-zinc-900 bg-zinc-200 w-full md:h-[200px] h-[250px] rounded-xl">
                <Container className="py-4">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.author_image}
                      alt={item.author_title}
                      priority
                      fetchPriority="high"
                      quality={100}
                      unoptimized
                      width={10}
                      height={10}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4>{item.author_title}</h4>
                      <Rating readOnly value={item.review_rating} />
                    </div>
                  </div>
                  <div>
                    <p className=" pt-4">{truncateText(item.review_text as string)}</p>
                  </div>
                </Container>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
