import React from 'react';

interface ProfileAddonsProps {
  wifiPrice: number;
  electricityPrice: number;
}

const ProfileAddons: React.FC<ProfileAddonsProps> = ({ wifiPrice, electricityPrice }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full md:w-[30%] rounded-xl h-[370px] flex justify-center items-center flex-col">
        <h1>Wifi bill</h1>
        <div>
          <h3>amount</h3>
          <p>{wifiPrice}</p>
        </div>
      </div>
      <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full md:w-[30%] rounded-xl h-[370px] flex justify-center items-center flex-col">
        <h1>Electric bill</h1>
        <div>
          <h3>amount</h3>
          <p>{electricityPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileAddons;
