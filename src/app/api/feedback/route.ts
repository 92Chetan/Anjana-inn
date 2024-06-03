import { NextRequest, NextResponse } from 'next/server';

import { formatZodError } from '@/lib/zodError';
import { feedbackSchema } from '@/validation/feedbackShema';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/action/getCurrentUser';
import { currentDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }
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
        author_image: currentUser?.avatar,
        author_title: currentUser?.name,
        createAt: currentDate.toDate()
      }
    });
    return NextResponse.json({ message: 'you feedback successfully submit thank you 😊' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
