'use client';
import React from 'react';
import Link from 'next/link';
import { Redressed } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { disableNavWithFooter } from '../utils/disableNavWithFooter';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const Footer = () => {
  const path = usePathname();
  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <footer className="bg-zinc-100 dark:bg-zinc-900">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <Link
                  href="/"
                  className={`${redressed.className} self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-[6vh]`}>
                  Anjana inn
                </Link>
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
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                &copy; {new Date().getFullYear()}{' '}
                <Link href="https://flowbite.com/" className="hover:underline">
                  Anjana Inn™
                </Link>
                . All Rights Reserved.
              </span>
            </div>
          </div>
        </footer>
      )}
    </React.Fragment>
  );
};

export default Footer;
