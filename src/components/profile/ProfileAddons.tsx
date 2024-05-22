import React from 'react';
import { Button } from '../ui/button';

interface ProfileAddonsProps {
  wifiPrice: number;
  electricityPrice: number;
}

const ProfileAddons: React.FC<ProfileAddonsProps> = ({ wifiPrice, electricityPrice }) => {
  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary  w-full rounded-xl h-[150px] flex justify-between py-2 items-center flex-col">
      <h1> Bills</h1>
      <div className="flex justify-between items-center w-full px-3">
        <h3>wifi Bill</h3>
        <p>&#8377;{wifiPrice}</p>
      </div>{' '}
      <div className="flex justify-between items-center w-full px-3">
        <h3>Electricity Bill</h3>
        <p>&#8377;{electricityPrice}</p>
      </div>
      <hr />
      <div className="flex justify-between items-center w-full px-3">
        <h3>Total Price</h3>
        <p>&#8377;{electricityPrice + wifiPrice}</p>
      </div>
      <Button>Pay now</Button>
    </div>
  );
};

export default ProfileAddons;
