'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import PayHistory from './PayHistory';
import ProfileCard from './ProfileCard';
import { SafeUser } from '@/types/types';

interface ProfilePageProps {
  UserData: SafeUser | null | undefined;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ UserData }) => {
  const { status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      route.push('/login'), route.refresh();
    }
  }, [route, status]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 md:flex-row">
      <ProfileCard UserData={UserData} />
      <PayHistory />
    </div>
  );
};

export default ProfilePage;
