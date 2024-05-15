import toast from 'react-hot-toast';

type PaymentType = {
  plan_id?: string;
  entity: 'order' | 'subscription';
  price?: number;
};

export const makePayment = async ({ entity, plan_id, price }: PaymentType) => {
  console.log(entity);
  try {
    let response;
    if (entity === 'subscription') {
      response = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan_id, entity })
      });
    }

    response = await fetch('/api/payment/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entity, amount: price })
    });

    if (!response || !response.ok) {
      throw new Error('Failed to fetch subscription data');
    }

    const data = await response.json();

    if (data) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
        [entity === 'subscription' ? 'subscription_id' : 'order_id']:
          `${data[entity === 'subscription' ? 'sub_id' : 'order_id']}`,
        name: 'Acme Corp.',
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
