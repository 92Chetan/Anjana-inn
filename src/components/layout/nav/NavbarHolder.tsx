'use client';
import React from 'react';
import Link from 'next/link';
import { IoMdNotifications } from 'react-icons/io';
import { Redressed } from 'next/font/google';

import Container from '../../utils/Container';
import Themeresolver from './Themeresolver';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';
import { disableNavWithFooter } from '@/components/utils/disableNavWithFooter';
import { SafeUser } from '@/types/types';

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
              <Link href="/" className={`${redressed.className} text-2xl`}>
                Anajana Inn
              </Link>
              <div className="md:flex justify-center items-center hidden gap-4">
                <Link href="/gallery" className="dark:hover:text-gray-400 hover:text-gray-600">
                  Gallery
                </Link>
                <Link href="/plans" className="dark:hover:text-gray-400 hover:text-gray-600">
                  Plans
                </Link>
                <Link href="/contact" className="dark:hover:text-gray-400 hover:text-gray-600">
                  Contact us
                </Link>
              </div>
            </div>
            <div className=" flex justify-center items-center gap-2">
              <Themeresolver />
              <IoMdNotifications size={25} className="cursor-pointer" />
              <UserMenu UserData={userData} />
            </div>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarHolder;
