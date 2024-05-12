import axios from 'axios';

export const feedback = async (payload: object) => {
  try {
    const response = await axios.post('/api/feedback', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
