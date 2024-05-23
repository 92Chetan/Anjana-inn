import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { mailSender } from '@/lib/mail';
// import { UploadImage } from '@/lib/ImageUpload';
import { currentDate } from '@/lib/utils';
import { randomInt } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;
    const avatar = formData.get('avatar') as File | null;

    if (!name || !email || !password || !avatar) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      return NextResponse.json({ message: 'user already register' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    if (!hashPass) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }

    // const image = await UploadImage(avatar);

    // console.log(image);
    // if (!image) {
    //   return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    // }
    const authCode = randomInt(100000, 1000000).toString();
    console.log(authCode);
    if (!authCode) {
      return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
    }

    const mail = await mailSender({ email, subject: 'verify email', name, authCode });

    if (mail.error) {
      console.log(mail.error);
      return NextResponse.json({ message: mail.error.message }, { status: 403 });
    }

    await db.user.create({
      data: {
        email,
        name,
        password: hashPass,
        authCode,
        avatar: 'image',
        createAt: currentDate.toDate()
      }
    });

    return NextResponse.json({ message: 'User created successfully', email }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
