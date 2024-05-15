export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { RegisterFrom } from '@/components/auth/RegisterFrom';
import Container from '@/components/utils/Container';
import React from 'react';

const Register = () => {
  return (
    <Container className="h-screen flex justify-center items-center">
      <RegisterFrom />
    </Container>
  );
};

export default Register;
