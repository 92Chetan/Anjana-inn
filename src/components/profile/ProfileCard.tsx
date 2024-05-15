import { User } from '@prisma/client';
import Image from 'next/image';
import Feedbackmodal from '../feedback/Feedbackmodal';

interface ProfileCardProps {
  UserData: User | null | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ UserData }) => {
  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full md:w-[30%] rounded-xl h-[350px] flex justify-center items-center flex-col">
      <div className="w-14 cursor-pointer h-14 rounded-full overflow-hidden">
        <Image
          src={(UserData?.avatar as string) || 'http://www.gravatar.com/avatar/?d=identicon'}
          alt="avatar"
          loading="lazy"
          width={20}
          height={20}
          className="w-full h-full rounded-full"
        />
      </div>
      <h1 className="text-md py-4">{UserData?.name}</h1>
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
      <Feedbackmodal />
    </div>
  );
};

export default ProfileCard;
