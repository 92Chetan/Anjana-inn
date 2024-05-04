import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  asChild?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className="w-8 cursor-pointer h-8 rounded-full overflow-hidden">
      <Image
        src={src || 'http://www.gravatar.com/avatar/?d=identicon'}
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
