import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const crypt = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRETE as string);
    crypt.update(JSON.stringify(body));
    //TODO
    const digest = crypt.digest('hex');
    if (digest === req.headers.get('x-razorpay-signature')) {
      return NextResponse.json({ message: 'Payment success' }, { status: 200 });
    }
    return NextResponse.json({ message: 'some thing wrong' }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
