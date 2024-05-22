import { Feedback } from '@prisma/client';
import axios from 'axios';

export const getFeed = async (): Promise<Feedback[] | null> => {
  try {
    const response = await axios.get('/api/getFeedback');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
