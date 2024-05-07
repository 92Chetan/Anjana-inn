import ContactUs from '@/components/contact/ContactUs';
import Container from '@/components/utils/Container';
import React from 'react';

const contact = () => {
  return (
    <div className="h-full w-full">
      <Container className="flex items-center py-8">
        <ContactUs />
      </Container>
    </div>
  );
};

export default contact;
