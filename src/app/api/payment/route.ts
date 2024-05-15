export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import axios from 'axios';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { Subscription } from '@prisma/client';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const user_response = await db.subscription.findMany({
      where: { user_id: session?.user?.id?.toString()! }
    });

    const response = await Promise.all(
      user_response.map(async (item: Subscription) => {
        try {
          const axiosResponse = await axios.get(
            `https://api.razorpay.com/v1/subscriptions/${item.sub_id}`,
            {
              auth: {
                username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
                password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
              }
            }
          );

          if (axiosResponse.data.status === 'active' || axiosResponse.data.status === 'complete') {
            const planResponse = await axios.get(
              `https://api.razorpay.com/v1/plans/${axiosResponse.data.plan_id}`,
              {
                auth: {
                  username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
                  password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
                }
              }
            );
            const Data = { ...axiosResponse.data, plan_id: planResponse.data };
            return Data;
          }
          return null;
        } catch (error) {
          console.error(
            `Error fetching subscription data for subscription ID ${item.sub_id}:`,
            error
          );
          return null;
        }
      })
    );

    return NextResponse.json(response.filter(Boolean), { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
