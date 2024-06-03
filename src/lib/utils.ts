import { type ClassValue, clsx } from 'clsx';
import moment from 'moment-timezone';
import { twMerge } from 'tailwind-merge';
import QRCode from 'qrcode';
import { Resend } from 'resend';

import { EmailTemplate } from '@/components/utils/EmailTemplate';
import { Mail } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentDate = moment().clone().tz('Asia/Kolkata');

export const genQr = async (amount: number) => {
  const url = `upi://pay?pa=${process.env.UPI_ID}&pn=${process.env.UPI_HOLDER_NAME}&am=${amount}&cu=INR`;

  const qrCode = await QRCode.toDataURL(url, {
    type: 'image/png',
    margin: 1,
    width: 300
  });
  return qrCode;
};

export const truncateText = (str: string) => {
  if (str.length < 110) {
    return str;
  }

  return str.substring(0, 110) + '...';
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const mailSender = async ({
  email,
  subject,
  name,
  authCode,
  hashCode,
  id,
  amount,
  sub_id,
  user_id,
  addon_id
}: Mail): Promise<any> => {
  const emailContent = EmailTemplate({
    firstName: name,
    authCode,
    hashCode,
    id,
    amount,
    sub_id,
    user_id,
    addon_id
  });

  const data = await resend.emails.send({
    from: 'anjanainn@info.anjanainn.com',
    to: [email],
    subject,
    react: emailContent,
    text: ''
  });

  return data;
};

export const HeroImage = [
  '/images/building_1.jpg',
  '/images/building_2.jpg',
  '/images/building_3.jpg',
  '/images/building_4.jpg',
  '/images/building_5.jpg'
];

export const currentDateFromNow = moment().startOf('day').unix();
export const oneDayLater = moment().add(1, 'day').startOf('day').unix();
export const oneYearLater = moment().add(1, 'year').startOf('day').unix();
export const oneMonthLater = moment().add(1, 'month').startOf('day').unix();
export const threeMonthsLater = moment().add(3, 'months').startOf('day').unix();
