import axios from 'axios';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import { SubData } from '@/types/types';

export const getPaymentDetails = async (): Promise<SubData[] | undefined> => {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const user_response = await db.subscription.findMany({
      where: { user_id: session?.user?.id?.toString()! }
    });

    const response = await Promise.all(
      user_response.map(async (item) => {
        try {
          const axiosResponse = await axios.get(
            `https://api.razorpay.com/v1/subscriptions/${item.sub_id}`,
            {
              auth: {
                username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
                password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
              }
            }
          );

          if (axiosResponse.data.status === 'active' || axiosResponse.data.status === 'complete') {
            const planResponse = await axios.get(
              `https://api.razorpay.com/v1/plans/${axiosResponse.data.plan_id}`,
              {
                auth: {
                  username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
                  password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
                }
              }
            );
            const Data = { ...axiosResponse.data, plan_id: planResponse.data };
            return Data;
          }
          return null;
        } catch (error) {
          console.error(
            `Error fetching subscription data for subscription ID ${item.sub_id}:`,
            error
          );
          return null;
        }
      })
    );
    return response.filter(Boolean);
  } catch (error) {
    console.log(error);
    toast.error('Internal server');
  }
};
