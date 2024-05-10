const initializeRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const makePayment = async () => {
  try {
    const res = await initializeRazorpay();

    if (!res) {
      throw new Error('Razorpay SDK Failed to load');
    }

    const response = await fetch('/api/payment/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plan_id: 'plan_O3fFsn3DItHZGB' })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription data');
    }

    const data = await response.json();
    console.log(data.subscription_id);

    if (data) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY as string,
        subscription_id: `${data.sub_id}`,
        name: 'Acme Corp.',
        description: 'Monthly Test plane',

        handler: function (response: any) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_subscription_id);
          alert(response.razorpay_signature);
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
