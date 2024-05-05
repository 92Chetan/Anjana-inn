import GalleryHolder from '@/components/gallery/GalleryHolder';
import Container from '@/components/utils/Container';
import React from 'react';

const Gallery = () => {
  return (
    <div className="w-full">
      <Container className="py-3 overflow-scroll overflow-x-hidden flex justify-center items-center">
        <GalleryHolder />
      </Container>
    </div>
  );
};

export default Gallery;
