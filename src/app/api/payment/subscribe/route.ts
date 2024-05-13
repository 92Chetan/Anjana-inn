import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { paymentSchema } from '@/validation/payments/paymentSchema';
import { authOptions, CustomSession } from '../../auth/[...nextauth]/options';

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
});

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }

    const body = await req.json();
    const { error, data } = paymentSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const response = await instance.subscriptions.create({
      plan_id: data.plan_id,
      customer_notify: 1,
      total_count: 2
    });

    await db.subscription.create({
      data: {
        plane_id: data.plan_id,
        sub_id: response.id,
        user_id: session?.user?.id?.toString()!
      }
    });

    return NextResponse.json({ sub_id: response.id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}