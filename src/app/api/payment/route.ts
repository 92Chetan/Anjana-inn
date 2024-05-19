export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Subscription } from '@prisma/client';
import { fetchSubscription } from '@/lib/api/Subscription';
import { fetchOrder } from '@/lib/api/Orders';
import { getCurrentUser } from '@/action/getCurrentUser';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }

    const user_response = await db.subscription.findMany({
      where: { user_id: currentUser?.id }
    });

    const response = await Promise.all(
      user_response.map(async (item: Subscription) => {
        if (item.sub_id !== null) {
          const res = await fetchSubscription(item);
          return res;
        } else {
          const res = await fetchOrder(item);
          return res;
        }
      })
    );

    return NextResponse.json(response.filter(Boolean).reverse(), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
