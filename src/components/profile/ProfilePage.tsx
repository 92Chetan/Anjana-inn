'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// import PayHistory from './PayHistory';
import ProfileCard from './ProfileCard';
import { SafeUser } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { tempHistoryDetails } from '@/lib/api/temp';
import PayHistory from './PayHistory';
interface ProfilePageProps {
  UserData: SafeUser | null | undefined;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ UserData }) => {
  const route = useRouter();
  const { data: subData } = useQuery({
    queryKey: ['tmppayment'],
    queryFn: tempHistoryDetails,
    refetchInterval: 30 * 1000
  });

  useEffect(() => {
    if (!UserData) {
      route.push('/login'), route.refresh();
    }
  }, [UserData, route]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 md:flex-row">
      <ProfileCard
        UserData={UserData}
        subStatus={subData && subData[0]?.status}
        addons={subData && subData[0]?.Addon[0]}
        wifiTaken={subData && subData[0]?.wifiBillTaken}
      />

      <PayHistory subData={subData} />
    </div>
  );
};

export default ProfilePage;
