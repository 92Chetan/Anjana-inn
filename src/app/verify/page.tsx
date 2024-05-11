import { VerifyFrom } from '@/components/auth/Verify';
import Container from '@/components/utils/Container';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Container className="h-screen flex justify-center items-center">
      <Suspense fallback={<div>Loadd...</div>}>
        <VerifyFrom />
      </Suspense>
    </Container>
  );
};

export default Page;
