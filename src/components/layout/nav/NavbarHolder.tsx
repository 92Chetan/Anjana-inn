'use client';
import React from 'react';
import Link from 'next/link';
// import { IoMdNotifications } from 'react-icons/io';
import { Redressed } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Link as ReactLink } from 'react-scroll';

import Container from '../../utils/Container';
import Themeresolver from './Themeresolver';
import UserMenu from './UserMenu';
import { disableNavWithFooter } from '@/components/utils/disableNavWithFooter';
import { SafeUser } from '@/types/types';
import { MobileMenu } from './MobileMenu';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

interface NavbarHolderProps {
  userData: SafeUser | null | undefined;
}

const NavbarHolder: React.FC<NavbarHolderProps> = ({ userData }) => {
  const path = usePathname();
  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <div className="z-30 w-full h-[60px] dark:bg-zinc-800 bg-zinc-100 backdrop-blur-3xl sticky top-0 left-0 right-0 shadow-md border-b">
          <Container className="flex justify-between items-center">
            <div className="flex justify-center gap-8 items-center">
              <div className="flex justify-center items-center gap-1">
                <div className="md:hidden">
                  <MobileMenu userData={userData} />
                </div>
                <Link href="/" className={`${redressed.className} text-2xl`}>
                  Anajana Inn
                </Link>
              </div>

              <div className="md:flex justify-center items-center hidden gap-4">
                <ReactLink
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}
                  className="dark:hover:text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  About
                </ReactLink>
                <ReactLink
                  activeClass="active"
                  to="plans"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  className="dark:hover:text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Plans
                </ReactLink>
                <ReactLink
                  activeClass="active"
                  to="testimonial"
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}
                  className="dark:hover:text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Testimonial
                </ReactLink>
                <ReactLink
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}
                  className="dark:hover:text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Contact us
                </ReactLink>
                <Link href="/gallery" className="dark:hover:text-gray-400 hover:text-gray-600">
                  Gallery
                </Link>
              </div>
            </div>
            <div className=" flex justify-center items-center gap-2">
              <Themeresolver />
              {/* <IoMdNotifications size={25} className="cursor-pointer" /> */}
              <UserMenu UserData={userData} />
            </div>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarHolder;
