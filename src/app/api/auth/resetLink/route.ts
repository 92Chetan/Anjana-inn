import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { verifyOtpParams } from '@/validation/auth/authSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { mailSender } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // valid input
    const { error, data } = verifyOtpParams.safeParse(body);

    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }

    const { email } = data;

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashCode = await bcrypt.hash(process.env.HASH_SECRETE as string, salt);

    await db.user.update({ where: { email }, data: { resetHash: hashCode } });

    const mail = await mailSender({
      email,
      subject: 'verify email',
      name: user.name,
      hashCode,
      id: user.id
    });

    if (mail.error) {
      return NextResponse.json({ message: mail.error.message }, { status: 403 });
    }

    return NextResponse.json({ message: 'Please check your mail' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
