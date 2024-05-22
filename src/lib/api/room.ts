import { CheckRoomAvbalive } from '@prisma/client';
import axios from 'axios';

export const fetchRoom = async (): Promise<CheckRoomAvbalive[]> => {
  try {
    const response = await axios.get('/api/addRoom/getRoom');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
