import React from 'react';
import type { ImageResult } from '@/models/images';
import { fetchImage } from '@/lib/fetchImages';
import ImageContainer from './ImageContainer';

const GalleryHolder = async () => {
  const url = 'https://api.pexels.com/v1/curated';
  const image: ImageResult | undefined = await fetchImage(url);
  if (!image) {
    return <h2 className="m-4 text-2xl font-bold">No image found</h2>;
  }
  return (
    <section className="px-1 grid  grid-cols-1 auto-rows-[10px] md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
      {image && image.photos?.map((photo) => <ImageContainer photos={photo} key={photo.id} />)}
    </section>
  );
};

export default GalleryHolder;
