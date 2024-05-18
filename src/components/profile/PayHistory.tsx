import { SubData } from '@/types/types';
import moment from 'moment';

interface PayHistoryProps {
  subData: SubData[] | null | undefined;
}

const PayHistory: React.FC<PayHistoryProps> = ({ subData }) => {
  const differentBetweenTodays = (StartDate: number, EndDate: number) => {
    const days = moment.unix(EndDate).diff(moment.unix(StartDate), 'day');
    return days;
  };
  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary w-full overflow-y-scroll rounded-xl h-[370px] px-2">
      {subData?.length === 0 && (
        <div className="flex justify-center items-center h-full w-full overflow-hidden">
          <h1>No Data available</h1>
        </div>
      )}
      {subData && (
        <table className="">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Wifi</th>
              <th>Electricity</th>
            </tr>
          </thead>

          {subData?.map((sub) => (
            <tr key={sub.id}>
              <td>
                <div className=" flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold leading-none">
                    {moment.unix(sub.start_at).format('Do')}
                  </h1>
                  <div className="flex justify-center items-center leading-none gap-1">
                    <p className="leading-none">{moment.unix(sub.start_at).format('MMM')}</p>
                    <p className="leading-none">{moment.unix(sub.start_at).format('YYYY')}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className=" flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold leading-none">
                    {moment.unix(sub.end_at).format('Do')}
                  </h1>
                  <div className="flex justify-center items-center leading-none gap-1">
                    <p className="leading-none">{moment.unix(sub.end_at).format('MMM')}</p>
                    <p className="leading-none">{moment.unix(sub.end_at).format('YYYY')}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex">
                  &#8377;
                  {sub.addons && <div>{differentBetweenTodays(sub.start_at, sub.end_at) * 6}</div>}
                </div>
              </td>
              <td>
                <div className="flex">
                  {sub.electricity ? <div> &#8377; {sub.electricity}</div> : <h5>Admin</h5>}
                </div>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default PayHistory;
