export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { Subscription } from '@prisma/client';
import { fetchSubscription } from '@/lib/api/Subscription';
import { fetchOrder } from '@/lib/api/Orders';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const user_response = await db.subscription.findMany({
      where: { user_id: session?.user?.id?.toString()! }
    });

    const response = await Promise.all(
      user_response.map(async (item: Subscription) => {
        if (item.sub_id !== null) {
          const res = await fetchSubscription(item.sub_id as string);
          return res;
        } else {
          const res = await fetchOrder(item.order_id as string);
          return res;
        }
      })
    );

    return NextResponse.json(response.filter(Boolean), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
