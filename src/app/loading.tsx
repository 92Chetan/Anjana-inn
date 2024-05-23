'use client';

import Loader from '@/components/utils/Loader';
import { disableNavWithFooter } from '@/components/utils/disableNavWithFooter';
import { usePathname } from 'next/navigation';
import React from 'react';

const Loading = () => {
  const path = usePathname();
  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <div className="h-screen w-screen overflow-hidden">
          <Loader />
        </div>
      )}
    </React.Fragment>
  );
};

export default Loading;
