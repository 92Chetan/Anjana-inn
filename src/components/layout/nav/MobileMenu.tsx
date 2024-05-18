'use client';
import { IoMenu } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Redressed } from 'next/font/google';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { SafeUser } from '@/types/types';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

interface MobileMenuProps {
  userData: SafeUser | null | undefined;
}

export function MobileMenu({ userData }: MobileMenuProps) {
  const path = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="transparent"
          type="submit"
          className="px-0 justify-center flex items-center">
          <IoMenu size={32} />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetClose asChild>
            <SheetTitle>
              <Link href="/" className={`${redressed.className} text-2xl`}>
                Anajana Inn
              </Link>
            </SheetTitle>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col justify-center gap-6 py-12">
          <SheetClose asChild>
            <Link href="/gallery" className="md:hidden">
              Gallery
            </Link>
          </SheetClose>{' '}
          <SheetClose asChild>
            <Link href="/plans" className="md:hidden">
              Plans
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/contact" className="md:hidden">
              Contact us
            </Link>
          </SheetClose>
          <hr className="dark:bg-black" />
          {userData ? (
            <SheetClose asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  signOut();
                }}>
                Log out
              </Button>
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Link href={path === '/plans' ? '/login?redirect=/plans' : '/login'}>
                <Button className="cursor-pointer w-full">Log in</Button>
              </Link>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
