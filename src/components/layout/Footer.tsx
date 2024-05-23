'use client';
import React from 'react';
import Link from 'next/link';
import { Redressed } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { disableNavWithFooter } from '../utils/disableNavWithFooter';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const Footer = () => {
  const path = usePathname();
  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <footer className="bg-zinc-100 dark:bg-zinc-900">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between ">
              <div className=" flex gap-4 flex-col pb-4 ">
                <Link
                  href="/"
                  className={`${redressed.className} text-2xl font-semibold whitespace-nowrap dark:text-white text-[6vh]`}
                >
                  Anjana inn
                </Link>
                <Image
                  src="/images/rent_2.jpg"
                  alt="hello"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] rounded-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Resources
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-5">
                    <li className="mt-4">
                      <Link href="/gallery" className="hover:underline">
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link href="/plans" className="hover:underline">
                        Plans
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:underline">
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="max-md:pt-3">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href="/policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                &copy; {new Date().getFullYear()}{' '}
                <Link href="https://flowbite.com/" className="hover:underline">
                  Anjana Inn™
                </Link>
                . All Rights Reserved.
              </span>
              <div className="flex justify-center items-center gap-4">
                <Image src="/images/make_in.png" width={50} height={50} alt="png" />{' '}
                <Image src="/images/make_in1.png" width={50} height={50} alt="png" />
              </div>
            </div>
          </div>
        </footer>
      )}
    </React.Fragment>
  );
};

export default Footer;
