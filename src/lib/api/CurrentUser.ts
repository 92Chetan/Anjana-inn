import { User } from '@prisma/client';
import axios from 'axios';

export const CurrentUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get('/api/user');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
