import { db } from '@/lib/db';

export const getPlans = async () => {
  try {
    const plans = await db.bill.findMany();

    if (!plans) {
      return null;
    }

    return plans;
  } catch (error) {
    console.log(error);
    return null;
  }
};
