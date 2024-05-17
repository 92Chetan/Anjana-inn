import { db } from '@/lib/db';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const secret = process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE;
    if (!secret) {
      throw new Error('Razorpay API secret is not defined');
    }

    const existOrder = await db.subscription.findUnique({
      where: {
        order_id: body.payload.payment.entity.order_id
      }
    });
    if (existOrder) {
      await db.subscription.update({
        where: {
          order_id: body.payload.payment.entity.order_id
        },
        data: {
          status: 'active'
        }
      });
    }
    const crypt = crypto.createHmac('sha256', secret);
    crypt.update(JSON.stringify(body));
    //TODO
    const digest = crypt.digest('hex');
    if (digest === req.headers.get('x-razorpay-signature')) {
      return NextResponse.json({ message: 'Payment success' }, { status: 200 });
    }
    return NextResponse.json({ message: 'some thing wrong' }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
