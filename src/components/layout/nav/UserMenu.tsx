'use client';
import React, { Suspense, useCallback, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import Avatar from './Avatar';
import MenuItem from './MenuItem';
import Backdrop from './Backdrop';
import { SafeUser } from '@/types/types';
import { usePathname } from 'next/navigation';

interface UserMenuProps {
  UserData: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ UserData }) => {
  const { status } = useSession();
  const path = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <React.Fragment>
      <div className="relative z-30">
        <div onClick={toggleHandler}>
          <Suspense fallback={<div>load</div>}>
            <Avatar src={UserData?.avatar} />
          </Suspense>
        </div>

        {isOpen && (
          <div className="absolute top-12 right-0  dark:bg-zinc-800 bg-zinc-100 overflow-hidden w-[170px] flex flex-col rounded-md shadow-md backdrop-blur-3xl">
            <div>
              <Link href="/profile">
                <MenuItem onClick={toggleHandler}>Profile</MenuItem>
              </Link>
              <hr className="dark:bg-black max-md:hidden" />
              {status === 'authenticated' ? (
                <div className="cursor-pointer max-md:hidden">
                  <MenuItem
                    onClick={() => {
                      signOut();
                    }}>
                    Log out
                  </MenuItem>
                </div>
              ) : (
                <Link href={path === '/plans' ? '/login?redirect=/plans' : '/login'}>
                  <MenuItem onClick={toggleHandler}>Log in</MenuItem>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && <Backdrop toggleHandler={toggleHandler} />}
    </React.Fragment>
  );
};

export default UserMenu;
