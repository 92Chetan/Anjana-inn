export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React, { Suspense } from 'react';

import ProfilePage from '@/components/profile/ProfilePage';
import Container from '@/components/utils/Container';
import { getCurrentUser } from '@/action/getCurrentUser';
import Loader from '@/components/utils/Loader';

const Profile = async () => {
  const user = await getCurrentUser();
  return (
    <Container className="px-3 md:px-8 flex justify-center items-center my-10 h-full w-full">
      <Suspense fallback={<Loader />}>
        <ProfilePage UserData={user} />
      </Suspense>
    </Container>
  );
};

export default Profile;
