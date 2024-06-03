import { NextRequest, NextResponse } from 'next/server';

import { formatZodError } from '@/lib/zodError';
import { db } from '@/lib/db';
import { contactSchema } from '@/validation/contactSchema';
import { currentDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, data } = contactSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    await db.contactUs.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        message: data.message,
        createAt: currentDate.toDate()
      }
    });
    return NextResponse.json({
      message: 'thanks for contact with us 😊. we are resolve your problem as soon as possible'
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
