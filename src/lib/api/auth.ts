import axios from 'axios';

export const CreateUser = async (payload: any) => {
  console.log(payload);
  try {
    const response = await axios.post('/api/auth/register', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
