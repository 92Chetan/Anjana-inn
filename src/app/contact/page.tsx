export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ContactUs from '@/components/contact/ContactUs';
import Container from '@/components/utils/Container';
import React from 'react';

const Contact = () => {
  return (
    <Container>
      <div className="flex items-center justify-center py-8">
        <ContactUs />
      </div>
    </Container>
  );
};

export default Contact;
