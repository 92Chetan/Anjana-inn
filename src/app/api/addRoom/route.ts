import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { getCurrentUser } from '@/action/getCurrentUser';
import { RoomSchema } from '@/validation/room/validation';

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: 'Please login' }, { status: 401 });
    }

    const body = await req.json();
    const { error, data } = RoomSchema.safeParse(body);
    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        id: currentUser?.id
      }
    });

    if (user?.role !== 'admin') {
      return NextResponse.json({ message: 'invalid credential' }, { status: 401 });
    }

    await db.checkRoomAvbalive.create({
      data: {
        onstock: data.onstock,
        roomType: data.roomType,
        roomLable: data.roomLable
      }
    });
    return NextResponse.json({ message: 'room created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
