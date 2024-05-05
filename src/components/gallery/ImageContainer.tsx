'use client';
import type { photo } from '@/models/images';
import Image from 'next/image';

type Props = {
  photos: photo;
};

const ImageContainer = ({ photos }: Props) => {
  const widthHeightRatio = photos.height / photos.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpan = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div className="w-[250px] justify-center items-center" style={{ gridRow: `span ${photoSpan}` }}>
      <div className="grid place-content-center ">
        <div className="rounded-xl  overflow-hidden group">
          <Image
            src={photos.src.original}
            alt={photos.alt}
            width={250}
            height={galleryHeight}
            className=" group-hover:opacity-75 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
