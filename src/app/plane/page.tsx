import Container from '@/components/utils/Container';
import React from 'react';
import CardContainer from '@/components/plane/CardContainer';

const page = () => {
  return (
    <Container className="md:h-screen flex justify-center items-center px-2">
      <CardContainer />
    </Container>
  );
};

export default page;
