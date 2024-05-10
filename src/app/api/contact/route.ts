import { NextRequest, NextResponse } from 'next/server';

import { formatZodError } from '@/lib/zodError';
import { db } from '@/lib/db';
import { contactSchema } from '@/validation/contact/contactSchema';

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
    // TODO: add session id
    await db.contactUs.create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        message: data.message,
        auther_id: '08ed99ab-a9ac-4785-bddf-03b864f8bb65'
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
