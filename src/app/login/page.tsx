export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getCurrentUser } from '@/action/getCurrentUser';
import LoginFrom from '@/components/auth/LoginFrom';
import Container from '@/components/utils/Container';
import React from 'react';

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container className="h-screen flex justify-center items-center">
      <LoginFrom currentUser={currentUser} />
    </Container>
  );
};

export default Login;
