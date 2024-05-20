'use client';
import React, { useCallback } from 'react';
import { Zen_Kaku_Gothic_New, Zen_Kaku_Gothic_Antique } from 'next/font/google';
import { MdEmail, MdCall } from 'react-icons/md';

import ContactForm from './ContactForm';
import Heading from '../utils/Heading';

const zen = Zen_Kaku_Gothic_New({
  weight: '700',
  subsets: ['cyrillic']
});

const zenA = Zen_Kaku_Gothic_Antique({
  weight: '400',
  subsets: ['cyrillic']
});

const ContactUs = () => {
  const contact = useCallback((item: string) => {
    if (typeof window !== 'undefined') {
      window.open(item, '_blank');
    }
  }, []);
  return (
    <div
      className=" md:h-screen flex md:mb-0 mb-12 justify-center items-center flex-col gap-12"
      id="contact"
    >
      <Heading heading="contact us" />
      <div className="grid md:grid-cols-2 justify-center items-center grid-cols-1 md:gap-x-20 gap-y-6">
        <div>
          <h1 className={`${zen.className} text-4xl pb-10 text-wrap`}>Get Touch With us</h1>
          <div className="space-y-5">
            <button
              onClick={() => contact('tel:6260849824')}
              className="flex justify-center items-center gap-4"
            >
              <MdCall
                size={32}
                className="hover:scale-110 transition-all duration-75 text-blue-600"
              />
              <span className={`${zenA.className} tracking-wide hover:text-blue-500`}>
                6260849824
              </span>
            </button>
            <button
              onClick={() => contact('mailto:info.anjanainn@gmail.com')}
              className="flex justify-center items-center gap-4"
            >
              <MdEmail
                size={32}
                className="hover:scale-110 transition-all duration-75 text-blue-600"
              />
              <span className={`${zenA.className} tracking-wide hover:text-blue-500`}>
                info.anjanainn@gmail.com
              </span>
            </button>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
