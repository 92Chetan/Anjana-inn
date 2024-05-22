import { SubscriptionBill } from '@/types/types';
import axios from 'axios';

export const tempHistoryDetails = async (): Promise<SubscriptionBill[] | null> => {
  try {
    const response = await axios.get('/api/temp');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
