import { db } from '@/lib/db';
import QRCode from 'qrcode';
import { formatZodError } from '@/lib/zodError';
import { upiSchema } from '@/validation/upi/validation';
import { NextRequest, NextResponse } from 'next/server';

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
    const url = `upi://pay?pa=${process.env.UPI_ID}&pn=${process.env.UPI_HOLDER_NAME}&am=${body.amount}&cu=INR`;

    const qrCode = await QRCode.toDataURL(url, {
      type: 'image/png',
      margin: 1,
      width: 300
    });

    await db.tempSubscription.create({
      data: {
        amount: data.price,
        duration: data.duration,
        endDate: data.endDate,
        room: data.room,
        startDate: data.startDate,
        terms: data.terms,
        wifi: data.wifi,
        user_id: data.user_id
      }
    });

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
