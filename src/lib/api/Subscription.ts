import axios from 'axios';

export const fetchSubscription = async (SubscriptionId: string) => {
  const RateLimit = 3;
  let retry = 0;

  while (retry < RateLimit) {
    try {
      console.log(SubscriptionId);
      const axiosResponse = await axios.get(
        `https://api.razorpay.com/v1/subscriptions/${SubscriptionId}`,
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
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const delay = Math.pow(2, retry) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        retry++;
      } else {
        throw error;
      }
      console.error(
        `Error fetching subscription data for subscription ID ${SubscriptionId}:`,
        error
      );
      return null;
    }
  }
};
