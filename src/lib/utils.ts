import { type ClassValue, clsx } from 'clsx';
import moment from 'moment-timezone';
import { twMerge } from 'tailwind-merge';
import QRCode from 'qrcode';

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
