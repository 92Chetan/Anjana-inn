import { db } from '@/lib/db';
import { currentDate } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const device = req.headers.get('user-agent') as string;

    await db.vistiors.create({
      data: {
        device: device,
        min: currentDate.format('ma z'),
        hour: currentDate.format('ha z'),
        createAt: currentDate.toDate()
      }
    });

    return NextResponse.json({ message: 'user visited first time' }, { status: 200 });
  } catch (error) {
    console.error('Error updating visit count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
