import { NextRequest, NextResponse } from 'next/server';

import { genQr, mailSender } from '@/lib/utils';
import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { upiSchema } from '@/validation/upiValidation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reqHeader = req.headers;

    const { data, error } = upiSchema.safeParse(body);
    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const qrCode = await genQr(data.price);

    const response = await db.tempSubscription.create({
      data: {
        amount: data.price,
        duration: data.duration,
        endDate: data.endDate,
        room: data.room,
        startDate: data.startDate,
        terms: data.terms,
        wifi: data.wifi,
        wifiBillTaken: data.wifiBillTaken,
        user_id: data.user_id
      }
    });

    const user = await db.user.findUnique({
      where: { id: data.user_id }
    });
    if (user && response) {
      await mailSender({
        email: user?.email,
        subject: 'subscription recept',
        name: user?.name,
        amount: response.amount,
        sub_id: response.id
      });
      await mailSender({
        email: process.env.OWNER_EMAIL as string,
        subject: 'subscription recept - some one subscribe your service',

        amount: response.amount,
        sub_id: response.id,
        user_id: user.id
      });
    }

    reqHeader.set('content-type', 'image/png');
    NextResponse.next({
      headers: reqHeader
    });

    return NextResponse.json(qrCode, { status: 200 });
  } catch (error) {
    console.error('Error updating visit count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
