import { TERipple } from 'tw-elements-react';

import { timeline } from '@/types/types';

interface RippleButtonProps {
  planTimeline: timeline;
  setPlanTimeline: React.Dispatch<React.SetStateAction<timeline>>;
  text: timeline;
}

const RippleButton: React.FC<RippleButtonProps> = ({ planTimeline, setPlanTimeline, text }) => {
  return (
    <div>
      <TERipple
        rippleColor="rgb(96 165 250) "
        rippleColorDark="rgb(5 150 105)"
        className={`${planTimeline === text && 'bg-blue-100 dark:bg-emerald-950 border-blue-300 dark:border-green-400 text-blue-500 dark:text-green-400 '} border-[1px] w-32 text-center py-2 active:border-none duration-1000 transition-all cursor-pointer rounded-sm capitalize`}
        onClick={() => setPlanTimeline(text)}
      >
        {text}
      </TERipple>
    </div>
  );
};

export default RippleButton;
