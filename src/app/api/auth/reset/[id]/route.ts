import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { ResetPassword } from '@/validation/auth/authSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      hashCode: searchParams.get('hashCode')
    };

    const body = await req.json();
    // valid input
    const { error, data } = ResetPassword.safeParse(body);

    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const { password } = data;

    const user = await db.user.findFirst({
      where: { id: params.id }
    });

    if (!user) {
      return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
    }
    if (user.resetHash !== null) {
      if (user.resetHash !== queryParams.hashCode) {
        return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    if (!hashPass) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }
    await db.user.update({
      where: { id: params.id },
      data: { resetHash: null, password: hashPass }
    });
    return NextResponse.json(
      { message: 'password reset successfully. Please login' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
