'use client';

import { BsCheck2Circle } from 'react-icons/bs';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { paymentHistoryDetails } from '@/lib/api/payment';

const PayHistory = () => {
  const { data: subData } = useQuery({
    queryKey: ['payment'],
    queryFn: paymentHistoryDetails,
    staleTime: 6 * 1000,
    refetchInterval: 6 * 1000
  });

  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary w-full overflow-y-scroll rounded-xl h-[350px] px-2">
      <div className="sticky top-0 bg-secondary">
        <h1 className="text-xl">Invoice</h1>
        <hr className="h-[3px] bg-secondary/10 w-full rounded-full dark:bg-black/10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] " />
      </div>
      {subData?.map((sub) => (
        <div className="py-4 md:px-2" key={sub.id}>
          <div className="flex justify-between items-center">
            <div className=" flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold leading-none">
                {moment.unix(sub.start_at).format('Do')}
              </h1>
              <div className="flex justify-center items-center leading-none gap-1">
                <p className="leading-none">{moment.unix(sub.start_at).format('MMM')}</p>
                <p className="leading-none">{moment.unix(sub.start_at).format('YYYY')}</p>
              </div>
            </div>
            <p className="capitalize">{sub.plan_id.period}</p>
            <div className=" flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold leading-none">
                {moment.unix(sub.end_at).format('Do')}
              </h1>
              <div className="flex justify-center items-center leading-none gap-1">
                <p className="leading-none">{moment.unix(sub.end_at).format('MMM')}</p>
                <p className="leading-none">{moment.unix(sub.end_at).format('YYYY')}</p>
              </div>
            </div>
            <div
              className={`bg-green flex justify-center items-center gap-[1px] px-2 py-[1px] rounded-xl ${sub.status === 'active' ? 'bg-emerald-700' : 'bg-violet-700'} bg-opacity-25`}>
              <BsCheck2Circle
                className={`${sub.status === 'active' ? 'text-green-600' : 'text-violet-600'}`}
              />
              <span
                className={`${sub.status === 'active' ? 'text-green-600' : 'text-violet-600'} capitalize`}>
                {sub.status}
              </span>
            </div>
            <h1>&#8377; {sub.plan_id.item.amount / 100}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayHistory;
