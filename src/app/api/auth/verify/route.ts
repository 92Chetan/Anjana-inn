import { randomInt } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { mailSender } from '@/lib/mail';
import { formatZodError } from '@/lib/zodError';
import { verifyOtp, verifyOtpParams } from '@/validation/authSchema';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      email: searchParams.get('email')
    };
    const body = await req.json();

    // valid input and query
    const { error: OtpError, data: OtpData } = verifyOtp.safeParse(body);
    const { error: QueryError, data: QueryData } = verifyOtpParams.safeParse(queryParams);
    if (OtpError) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(OtpError) },
        { status: 400 }
      );
    }
    if (QueryError) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(QueryError) },
        { status: 400 }
      );
    }

    const { email } = QueryData;
    const { authCode } = OtpData;

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
    }

    if (authCode === user?.authCode) {
      await db.user.update({ where: { email }, data: { authCode: null, isVerified: true } });
      return NextResponse.json({ message: 'User verified' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Invalid otp' }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      email: searchParams.get('email')
    };

    const user = await db.user.findUnique({
      where: {
        email: queryParams.email as string
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'Wrong credential' }, { status: 400 });
    }

    const authCode = randomInt(100000, 1000000).toString();

    if (!authCode) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }

    const mail = await mailSender({
      email: user.email,
      subject: 'verify email',
      name: user.name,
      authCode
    });

    if (mail.error) {
      console.log(mail.error);
      return NextResponse.json({ message: mail.error.message }, { status: 403 });
    }

    await db.user.update({
      where: { id: user.id },
      data: { authCode }
    });

    return NextResponse.json({ message: 'successful send otp' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
