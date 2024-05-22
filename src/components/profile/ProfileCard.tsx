import { User } from '@prisma/client';
import Image from 'next/image';
import Feedbackmodal from '../feedback/Feedbackmodal';
import { Button } from '../ui/button';
import { useSelectModal } from '@/hooks/useSelectModal';
import React from 'react';
import QrCode from './QrCode';
import { Addon } from '@/types/types';
import ProfileAddons from './ProfileAddons';

interface ProfileCardProps {
  UserData: User | null | undefined;
  subStatus: string | undefined | null;
  addons: Addon | undefined | null;
  wifiTaken: Boolean | undefined | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ UserData, subStatus, addons, wifiTaken }) => {
  const { onOpen } = useSelectModal();
  return (
    <React.Fragment>
      <div className="w-full md:w-[40%] h-[450px] flex flex-col gap-3">
        <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full rounded-xl h-[370px] flex justify-center items-center flex-col ">
          <div className="mt-2 flex justify-center flex-col items-center gap-1">
            <div className="w-14 cursor-pointer h-14 rounded-full overflow-hidden">
              <Image
                src={(UserData?.avatar as string) || 'http://www.gravatar.com/avatar/?d=identicon'}
                alt="avatar"
                loading="lazy"
                width={20}
                height={20}
                className="w-full h-full rounded-full "
              />{' '}
            </div>
            {subStatus === 'active' && (
              <h3 className="px-1 my-2 bg-emerald-600 text-green-900 rounded-xl">{subStatus}</h3>
            )}
          </div>

          <h1 className="text-md py-2">{UserData?.name}</h1>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="bg-black/30 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl w-[80%] h-14 flex flex-col justify-center px-4">
              <p className="text-xs">Email</p>
              <p className="text-md font-light">{UserData?.email}</p>
            </div>
            <div className="bg-black/30 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl w-[80%] h-14 flex flex-col justify-center px-4">
              <p className="text-xs">Room number</p>
              <p className="text-md font-light">
                {UserData?.room ? UserData.room : 'Not yet subscribe'}
              </p>
            </div>
          </div>
          <div className=" w-full flex justify-center gap-[2px] items-center px-4 flex-wrap">
            <Feedbackmodal />
            {subStatus !== 'active' && <Button onClick={onOpen}>Book now</Button>}
          </div>
        </div>
        {addons && !addons.active && (
          <ProfileAddons
            electricityPrice={addons.electricPrice}
            wifiPrice={addons.wifiPrice}
            id={addons.id}
            wifiTaken={wifiTaken}
          />
        )}
      </div>
      <QrCode user_id={UserData?.id} />
    </React.Fragment>
  );
};

export default ProfileCard;
