import { TempSubscription } from '@prisma/client';
import axios from 'axios';

export const tempHistoryDetails = async (): Promise<TempSubscription[] | null> => {
  try {
    const response = await axios.get('/api/temp');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
