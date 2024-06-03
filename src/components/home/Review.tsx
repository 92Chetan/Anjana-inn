'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Container from '../utils/Container';
import Heading from '../utils/Heading';
import { getFeed } from '@/lib/api/fetchFeedback';
import { Feedback } from '@prisma/client';
import { truncateText } from '@/lib/utils';

const Review = () => {
  const [screenSize, setScreenSize] = useState<number>(2);

  const { data, error, isError } = useQuery({ queryKey: ['feedback'], queryFn: getFeed });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 600) {
        setScreenSize(2);
      } else {
        setScreenSize(1);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [error?.message, isError]);

  return (
    <div
      className="w-full h-[80vh] flex flex-col justify-center items-center gap-16"
      id="testimonial"
    >
      <Heading heading="testimonial" />
      <Swiper
        spaceBetween={30}
        slidesPerView={screenSize}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className="w-full transition-all ease-in-out duration-75"
      >
        {data &&
          data.map((item: Feedback, index: number) => (
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
                        <Rating readOnly value={Number(item.rating)} />
                      </div>
                    </div>
                    <div>
                      <p className=" pt-4">{truncateText(item.message as string)}</p>
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
