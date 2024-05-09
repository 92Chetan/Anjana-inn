import { db } from '@/lib/db';
import { formatZodError } from '@/lib/zodError';
import { verifyOtp, verifyOtpParams } from '@/validation/auth/authSchema';
import { NextRequest, NextResponse } from 'next/server';

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
