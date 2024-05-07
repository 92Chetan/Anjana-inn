import React from 'react';

interface BackdropProps {
  toggleHandler: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ toggleHandler }) => {
  return (
    <div
      className="absolute w-full h-screen z-20 top-0 left-0 bg-black/30 opacity-50"
      onClick={toggleHandler}
    />
  );
};

export default Backdrop;
