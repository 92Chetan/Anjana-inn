import axios from 'axios';

export const fetchPlans = async (plan_id: string) => {
  const RateLimit = 3;
  let retry = 0;

  while (retry < RateLimit) {
    try {
      const planResponse = await axios.get(`https://api.razorpay.com/v1/plans/${plan_id}`, {
        auth: {
          username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
          password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
        }
      });
      return planResponse.data;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const delay = Math.pow(2, retry) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        retry++;
      } else {
        throw error;
      }
      console.error(`Error fetching subscription data for plans ID ${plan_id}:`, error);
      return null;
    }
  }
};
