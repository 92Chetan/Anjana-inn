import { User } from '@prisma/client';

export type ReviewType = {
  author_title: string;
  review_text: string;
  author_image: string;
  review_rating: number;
  review_timestamp: number;
  review_datetime_utc: string;
};

export type SubData = {
  id: string;
  status: 'active' | 'complete';
  plan_id: PlaneData;
  end_at: number;
  start_at: number;
  addons: boolean;
  electricity: number | null;
  wifiPrice?: string;
  electricityPrice?: string;
};

export type PlaneData = {
  period: string;
  item: {
    amount: number;
  };
};

export type SafeUser = Omit<User, 'authCode' | 'resetHash' | 'createAt'> & {
  authCode: string | null;
  resetHash: string | null;
  createAt: Date;
};

export type cardType = {
  price: number;
  timeline: string;
  typeofRoom: string;
  entity: string;
  plan_id?: string;
  roomType?: roomType[];
  service: serviceType[];
};

export type serviceType = {
  title: string;
  value: any;
};

export type timeline = 'daily' | 'monthly' | 'quarterly' | 'annual' | 'custom';

export type roomType = { title: string; price: number };

export type SubscriptionBill = {
  id: string;
  amount: number;
  terms: boolean;
  wifi: boolean;
  startDate: number;
  status: string;
  endDate: number;
  duration: string;
  room: string;
  wifiBillTaken: boolean;
  Addon: Addon[];
  user_id: string;
};

export type Addon = {
  id: string;
  wifiPrice: number;
  electricPrice: number;
  tempSubBill_id?: string;
  billTaken: boolean;
  active: boolean;
};

export type Mail = {
  email: string;
  subject: string;
  name?: string;
  hashCode?: string;
  authCode?: string;
  id?: string;
  amount?: number;
  sub_id?: string;
  user_id?: string;
  addon_id?: string;
};

export type PaymentType = {
  plan_id?: string;
  entity: 'order' | 'subscription';
  price?: number;
  start_at?: number;
  end_at?: number;
  addon?: boolean;
};
