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

export const truncateText = (str: string) => {
  if (str.length < 110) {
    return str;
  }

  return str.substring(0, 110) + '...';
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
