'use client';
import React, { useCallback } from 'react';
import ContactForm from './ContactForm';
import { Zen_Kaku_Gothic_New, Zen_Kaku_Gothic_Antique } from 'next/font/google';
import { MdEmail, MdCall, MdLocationPin } from 'react-icons/md';

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
    <div className=" md:h-screen flex justify-center items-center">
      <div className="grid md:grid-cols-2 justify-center items-center grid-cols-1 md:gap-x-20 gap-y-6">
        <div>
          <h1 className={`${zen.className} text-4xl pb-10 text-wrap`}>Get Touch With us</h1>
          <div className="space-y-5">
            <button
              onClick={() => contact('mailto:info.anjanainn@gmail.com')}
              className="flex justify-center items-center gap-4">
              <MdEmail
                size={32}
                className="hover:scale-110 transition-all duration-75 text-blue-600"
              />
              <span className={`${zenA.className} tracking-wide hover:text-blue-500`}>
                info.anjanainn@gmail.com
              </span>
            </button>

            <button
              onClick={() => contact('tel:6260849824')}
              className="flex justify-center items-center gap-4">
              <MdCall
                size={32}
                className="hover:scale-110 transition-all duration-75 text-blue-600"
              />
              <span className={`${zenA.className} tracking-wide hover:text-blue-500`}>
                6260849824
              </span>
            </button>

            <button
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/place/Anjana+Inn/@23.250822,77.421519,17z/data=!4m6!3m5!1s0x397c43b4baafd97b:0x1a6920b5593b937c!8m2!3d23.2508215!4d77.4215193!16s%2Fg%2F11j4xmcscg?hl=en&entry=ttu',
                  '_blank'
                )
              }
              className="md:flex text-wrap transition-all duration-75 justify-center items-center gap-4">
              <MdLocationPin
                size={32}
                className="hover:scale-110 transition-all duration-75 text-blue-600"
              />
              <span className={`${zenA.className} tracking-wide hover:text-blue-500`}>
                10/2, Jinsi Rd, Jinsi Chouraha, Jahangirabad, Bhopal, Madhya Pradesh 462008
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
