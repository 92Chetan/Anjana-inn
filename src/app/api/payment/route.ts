import { NextResponse } from 'next/server';
import axios from 'axios';
import { db } from '@/lib/db';

export async function GET() {
  try {
    //TODO
    const user_response = await db.subscription.findMany({
      where: { user_id: '72726fad-43b8-47a6-8113-749709e83e56' }
    });

    const response = await Promise.all(
      user_response.map(async (item) => {
        try {
          const axiosResponse = await axios.get(
            `https://api.razorpay.com/v1/subscriptions/${item.sub_id}`,
            {
              auth: {
                username: 'rzp_test_YuS5qP1ySiohPm',
                password: 'YMkK8raUkftQ1KzlrFYu47K0'
              }
            }
          );
          console.log(axiosResponse.data);
          if (axiosResponse.data.status === 'active' || axiosResponse.data.status === 'complete') {
            return axiosResponse.data;
          }
          return null;
        } catch (error) {
          console.error(
            `Error fetching subscription data for subscription ID ${item.sub_id}:`,
            error
          );
          return null;
        }
      })
    );

    return NextResponse.json(response.filter(Boolean), { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'Internal server issue' }, { status: 500 });
  }
}
