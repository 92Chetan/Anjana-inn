import { SubData } from '@/types/types';
import axios from 'axios';

export const paymentHistoryDetails = async (): Promise<SubData[] | null> => {
  try {
    const response = await axios.get('/api/payment');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
