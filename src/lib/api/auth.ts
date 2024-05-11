import axios from 'axios';

export const CreateUser = async (payload: any) => {
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

export const VerifyOtp = async (Data: { authCode: string; email: string }) => {
  try {
    const response = await axios.post(`/api/auth/verify?email=${Data.email}`, {
      authCode: Data.authCode
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
