import { SubscriptionBill } from '@/types/types';
import moment from 'moment';
import Loader from '../utils/Loader';

interface PayHistoryProps {
  subData: SubscriptionBill[] | null | undefined;
}

const PayHistory: React.FC<PayHistoryProps> = ({ subData }) => {
  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary w-full overflow-y-scroll rounded-xl h-[470px] px-2">
      {subData?.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full overflow-hidden">
          <h1>No Data available</h1>
        </div>
      ) : subData ? (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Room
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subData?.map((sub) => (
                      <tr key={sub.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                          <div className=" flex flex-col justify-center items-center">
                            <h1 className="text-xl font-bold leading-none">
                              {moment.unix(sub.startDate).format('Do')}
                            </h1>
                            <div className="flex justify-center items-center leading-none gap-1">
                              <p className="leading-none">
                                {moment.unix(sub.startDate).format('MMM')}
                              </p>
                              <p className="leading-none">
                                {moment.unix(sub.startDate).format('YYYY')}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                          <div className=" flex flex-col justify-center items-center">
                            <h1 className="text-xl font-bold leading-none">
                              {moment.unix(sub.endDate).format('Do')}
                            </h1>
                            <div className="flex justify-center items-center leading-none gap-1">
                              <p className="leading-none">
                                {moment.unix(sub.endDate).format('MMM')}
                              </p>
                              <p className="leading-none">
                                {moment.unix(sub.endDate).format('YYYY')}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                          <div className="flex">
                            &#8377;
                            {sub.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <div className="flex">{sub.room}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PayHistory;
