export const dynamic = 'force-dynamic';
export const revalidate = 0;

import GalleryHolder from '@/components/gallery/GalleryHolder';
import Container from '@/components/utils/Container';
import React from 'react';

const Gallery = () => {
  return (
    <Container>
      <GalleryHolder />
    </Container>
  );
};

export default Gallery;
