export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Container from '@/components/utils/Container';
import React from 'react';
import CardContainer from '@/components/plane/CardContainer';
import { getCurrentUser } from '@/action/getCurrentUser';
import { getPlans } from '@/action/getPlans';

const page = async () => {
  const currentUser = await getCurrentUser();
  const getSubscribe = await getPlans();
  return (
    <Container className="h-full">
      <CardContainer userData={currentUser} Subscription={getSubscribe} />
    </Container>
  );
};

export default page;
