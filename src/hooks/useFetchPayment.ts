import { useQuery } from '@tanstack/react-query';

import { paymentHistoryDetails } from '@/lib/api/payment';

export const useFetchPayment = () => {
  return useQuery({
    queryKey: ['sub'],
    queryFn: paymentHistoryDetails
  });
};
