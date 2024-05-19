'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import PayHistory from './PayHistory';
import ProfileCard from './ProfileCard';
import { SafeUser } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { paymentHistoryDetails } from '@/lib/api/payment';

interface ProfilePageProps {
  UserData: SafeUser | null | undefined;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ UserData }) => {
  const route = useRouter();
  const { data: subData } = useQuery({
    queryKey: ['payment'],
    queryFn: paymentHistoryDetails,
    refetchInterval: 30 * 1000
  });

  useEffect(() => {
    if (!UserData) {
      route.push('/login'), route.refresh();
    }
  }, [UserData, route]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 md:flex-row">
      <ProfileCard UserData={UserData} subStatus={subData?.[0].status} />
      <PayHistory subData={subData} />
    </div>
  );
};

export default ProfilePage;
