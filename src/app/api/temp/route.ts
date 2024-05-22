export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/action/getCurrentUser';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }

    const response = await db.tempSubscription.findMany({
      where: {
        user_id: currentUser?.id
      }
    });

    return NextResponse.json(response.reverse(), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
