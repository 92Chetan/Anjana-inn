import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';

export const getCurrentUser = async () => {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      toast.error('Invalid credential');
    }

    const user = await db.user.findFirst({
      where: {
        id: session?.user?.id?.toString()
      }
    });

    if (!user) {
      toast.error('Invalid credential');
    }

    return user;
  } catch (error) {
    console.log(error);
    toast.error('Internal server');
  }
};
