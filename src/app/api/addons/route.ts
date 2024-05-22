import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { NextRequest, NextResponse } from 'next/server';
import { mailSender } from '@/lib/mail';
import { genQr } from '@/lib/utils';
import { Addon } from '@/validation/Addon';
import { getCurrentUser } from '@/action/getCurrentUser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reqHeader = req.headers;

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }
    const { data, error } = Addon.safeParse(body);
    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const qrCode = await genQr(data.price);

    const response = await db.addon.update({
      where: { id: data.id },
      data: { billTaken: true }
    });

    if (user && response) {
      await mailSender({
        email: user?.email,
        subject: 'bill recept',
        name: user?.name,
        amount: data.price,
        addon_id: data.id
      });
      await mailSender({
        email: 'kingsuk055@gmail.com',
        subject: 'bill recept - some one pah her bill',

        amount: data.price,
        addon_id: data.id,
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
