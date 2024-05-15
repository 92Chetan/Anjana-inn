'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const [userImage, setUserImage] = useState<string | null | undefined>(null);

  useEffect(() => {
    setUserImage(src);
  }, [src]);

  return (
    <div className="w-8 cursor-pointer h-8 rounded-full overflow-hidden">
      <Image
        src={userImage || 'http://www.gravatar.com/avatar/?d=identicon'}
        alt="avater"
        priority
        width={15}
        height={15}
        className="w-full h-full rounded-full"
      />
    </div>
  );
};

export default Avatar;
