import toast from 'react-hot-toast';
import logo from '../../public/images/rent_2.jpg';

type PaymentType = {
  plan_id?: string;
  entity: 'order' | 'subscription';
  price?: number;
  start_at?: number;
  end_at?: number;
  addon?: boolean;
};

export const makePayment = async ({
  entity,
  plan_id,
  price,
  start_at,
  end_at,
  addon
}: PaymentType) => {
  try {
    let response;
    if (entity === 'subscription' && plan_id !== undefined) {
      response = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entity,
          plan_id
        })
      });
    } else {
      response = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entity, amount: price, startAt: start_at, endAt: end_at, addon })
      });
    }

    if (!response || !response.ok) {
      console.log(response);
      throw new Error('Failed to fetch subscription data');
    }

    const data = await response.json();

    if (data.status === 401) {
      return toast.error(data.message);
    }

    if (data) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
        [entity === 'subscription' ? 'subscription_id' : 'order_id']:
          `${data[entity === 'subscription' ? 'sub_id' : 'order_id']}`,
        name: 'Anjana inn',
        image: { logo },
        description: 'Monthly Test plane',

        handler: function () {
          toast.success('Payment success');
        },

        theme: {
          color: '#F37254'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description);
      });

      paymentObject.open();
    }
  } catch (error) {
    console.error('Error occurred while making payment:', error);
    alert('An error occurred while making payment');
  }
};
