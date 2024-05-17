import axios from 'axios';

export const fetchOrder = async (OrderId: string) => {
  const RateLimit = 3;
  let retry = 0;

  while (retry < RateLimit) {
    try {
      console.log(OrderId);
      const axiosResponse = await axios.get(`https://api.razorpay.com/v1/orders/${OrderId}`, {
        auth: {
          username: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
          password: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRETE as string
        }
      });
      if (axiosResponse) {
        return axiosResponse.data;
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
      console.error(`Error fetching subscription data for Order ID ${OrderId}:`, error);
      return null;
    }
  }
};
