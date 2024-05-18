import { Subscription } from '@prisma/client';
import axios from 'axios';

export const fetchOrder = async (order: Subscription) => {
  const RateLimit = 3;
  let retry = 0;

  while (retry < RateLimit) {
    try {
      const axiosResponse = await axios.get(
        `https://api.razorpay.com/v1/orders/${order.order_id}`,
        {
          auth: {
            username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
            password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
          }
        }
      );
      if (axiosResponse) {
        const res = axiosResponse.data;
        return {
          ...res,
          start_at: order.start_at,
          end_at: order.end_at,
          status: order.status,
          addons: order.addon
        };
      }
      return null;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const delay = Math.pow(2, retry) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        retry++;
      } else {
        throw error;
      }
      console.error(`Error fetching subscription data for Order ID ${order.order_id}:`, error);
      return null;
    }
  }
};
