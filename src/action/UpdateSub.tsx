import { CurrentUser } from '@/lib/api/CurrentUser';
import { db } from '@/lib/db';
import { TempSubscription } from '@prisma/client';
import moment from 'moment';
import cron from 'node-cron';

const fetchDataSub = async (): Promise<TempSubscription[] | null> => {
  try {
    const user = await CurrentUser();
    if (!user) {
      return null;
    }
    const sub = await db.tempSubscription.findMany({
      where: { user_id: user.id },
      orderBy: { createAt: 'desc' },
      take: 1
    });
    return sub;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UpdateDataBase = async ({ id, date }: { id: string; date: number }) => {
  try {
    const user = await CurrentUser();
    if (!user) {
      return null;
    }
    const currentDate = moment().startOf('day').unix();
    if (date === currentDate) {
      await db.tempSubscription.update({
        where: { id: id },
        data: { status: 'complete' }
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
};

cron.schedule('* * * * *', async () => {
  const subData = await fetchDataSub();
  if (!subData || subData.length === 0) {
    return;
  }
  const latestSub = subData[0];
  await UpdateDataBase({ id: latestSub.id, date: latestSub.endDate });
});
