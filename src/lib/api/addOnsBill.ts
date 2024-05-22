import axios from 'axios';

export const addOnsBill = async (payload: object) => {
  try {
    const response = await axios.post('/api/addons', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
