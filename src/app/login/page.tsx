export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { LoginFrom } from '@/components/auth/LoginFrom';
import Container from '@/components/utils/Container';
import React from 'react';

const Login = async () => {
  return (
    <Container className="h-screen flex justify-center items-center">
      <LoginFrom />
    </Container>
  );
};

export default Login;
