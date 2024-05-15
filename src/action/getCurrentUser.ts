import { getServerSession } from 'next-auth';

import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';

export const getCurrentUser = async () => {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const user = await db.user.findFirst({
      where: {
        id: session?.user?.id?.toString()
      }
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
