import { NextRequest, NextResponse } from 'next/server';

import { formatZodError } from '@/lib/zodError';
import { feedbackSchema } from '@/validation/feedback/feedbackShema';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error, data } = feedbackSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }
    // TODO: add session id
    await db.feedback.create({
      data: {
        message: data.message,
        rating: data.rating,
        auther_id: '08ed99ab-a9ac-4785-bddf-03b864f8bb65'
      }
    });
    return NextResponse.json({ message: 'you feedback successfully submit thank you 😊' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
