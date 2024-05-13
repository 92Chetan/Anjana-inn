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
