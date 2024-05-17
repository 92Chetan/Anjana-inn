import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { billSchema } from '@/validation/bill/BillSchema';
import { formatZodError } from '@/lib/zodError';

export async function POST(req: NextRequest) {
  try {
    // const session: CustomSession | null = await getServerSession(authOptions);

    // if (!session) {
    //   return NextResponse.json({ message: 'Please login' }, { status: 401 });
    // }

    const body = await req.json();
    const { error, data } = billSchema.safeParse(body);
    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    // const user = await db.user.findFirst({
    //   where: {
    //     id: session?.user?.id?.toString()!
    //   }
    // });

    // if (user?.role !== 'admin') {
    //   return NextResponse.json({ message: 'invalid credential' }, { status: 401 });
    // }

    await db.bill.create({
      data: {
        entity: data.entity,
        price: data.price,
        roomType: data.roomType,
        service: data.service,
        timeline: data.timeline,
        typeofRoom: data.typeofRoom
      }
    });
    return NextResponse.json({ message: 'bill created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
