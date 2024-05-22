/* eslint-disable no-unused-vars */
'use client';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { useEffect, useRef, useState } from 'react';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Input } from '../ui/input';

interface CalenderProps {
  value: Range[];
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calender: React.FC<CalenderProps> = ({ onChange, value, disabledDates }) => {
  const [open, setOpen] = useState(false);

  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };
  return (
    <div className="inline-block">
      <Input
        value={`${format(value[0].startDate!, 'MM/dd/yyyy')} to ${format(value[0].endDate!, 'MM/dd/yyyy')}`}
        readOnly
        className="dark:border-white border-black"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={onChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={value}
            months={1}
            direction="horizontal"
            className="absolute left-[50%] translate-x-[-50%] top-[40px] border-1 z-[999] "
            disabledDates={disabledDates}
          />
        )}
      </div>
    </div>
  );
};

export default Calender;
