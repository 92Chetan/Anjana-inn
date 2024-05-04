'use client';
import React, { useCallback, useState } from 'react';
import Avatar from './Avatar';
import Link from 'next/link';
import MenuItem from './MenuItem';
import Backdrop from './Backdrop';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <React.Fragment>
      <div className="relative z-30">
        <div onClick={toggleHandler}>
          <Avatar />
        </div>

        {isOpen && (
          <div className="absolute top-12 right-0  dark:bg-zinc-800 bg-zinc-100 overflow-hidden w-[170px] flex flex-col rounded-md shadow-md backdrop-blur-3xl">
            <div>
              <Link href="/" className="md:hidden">
                <MenuItem onClick={toggleHandler}>Gallery</MenuItem>
              </Link>
              <Link href="/" className="md:hidden">
                <MenuItem onClick={toggleHandler}>Testimonial</MenuItem>
              </Link>
              <Link href="/">
                <MenuItem onClick={toggleHandler}>Profile</MenuItem>
              </Link>
              <hr className="dark:bg-black" />
              <MenuItem onClick={() => {}}>Log out</MenuItem>
            </div>
          </div>
        )}
      </div>
      {isOpen && <Backdrop toggleHandler={toggleHandler} />}
    </React.Fragment>
  );
};

export default UserMenu;
