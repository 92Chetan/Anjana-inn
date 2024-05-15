'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

import { disableNavWithFooter } from '../utils/disableNavWithFooter';

const QuickContactModal = () => {
  const path = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const contact = useCallback((item: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = item;
    }
  }, []);

  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <div className=" flex justify-center items-center">
          <div
            className="fixed md:bottom-8 md:right-5 right-2 z-10 gap-1 group bottom-4 cursor-pointer"
            onClick={() => setOpen(true)}>
            <div className="w-16 h-16 overflow-hidden relative">
              <Image
                src="/images/quickContact.gif"
                alt="my gif"
                fill
                className="w-full h-full rounded-full object-cover bg-yellow-400"
              />
            </div>
          </div>
          <div ref={refOne}>
            {open && (
              <div className="fixed md:bottom-[105px] md:right-[35px] right-[20px] z-10 gap-1 group bottom-[90px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="cursor-pointer" onClick={() => contact('tel:9303003303')}>
                    <div className="w-10 h-10 overflow-hidden relative">
                      <Image
                        src="/images/call.gif"
                        unoptimized
                        alt="my gif"
                        fill
                        className="w-full h-full rounded-full object-cover bg-yellow-400"
                      />
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => contact('mailto:anjanaInn@ctr.com')}>
                    <div className="w-10 h-10 overflow-hidden relative">
                      <Image
                        src="/images/Mail.gif"
                        alt="my gif"
                        fill
                        className="w-full h-full rounded-full object-cover bg-yellow-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default QuickContactModal;
