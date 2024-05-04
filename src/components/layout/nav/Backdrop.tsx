import React from 'react';

interface BackdropProps {
  toggleHandler: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ toggleHandler }) => {
  return (
    <div
      className="absolute w-screen h-screen z-20 top-0 left-0 bg-black/10 opacity-20"
      onClick={toggleHandler}
    />
  );
};

export default Backdrop;
