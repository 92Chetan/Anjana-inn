import { db } from '@/lib/db';
import { RegisterSchema } from '@/validation/auth/authSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { formatZodError } from '@/lib/zodError';
import { mailSender } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = RegisterSchema.safeParse(body);
    if (error) {
      return NextResponse.json(
        { message: 'Invalid request', error: formatZodError(error) },
        { status: 400 }
      );
    }
    const { password, email, name } = data;

    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      return NextResponse.json({ message: 'user already register' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    if (!hashPass) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }

    const authCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (!authCode) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }

    const mail = await mailSender({ email, subject: 'verify email', name, authCode });

    if (mail.error) {
      return NextResponse.json({ message: mail.error.message }, { status: 403 });
    }

    await db.user.create({
      data: {
        email,
        name,
        password: hashPass,
        authCode
      }
    });

    return NextResponse.json({ message: 'User created successfully', email }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
