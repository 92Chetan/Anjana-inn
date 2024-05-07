'use client';

import React, { ReactElement, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { VscFeedback } from 'react-icons/vsc';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {
  MdOutlineSentimentDissatisfied,
  MdSentimentVerySatisfied,
  MdOutlineSentimentNeutral
} from 'react-icons/md';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { IoSadOutline } from 'react-icons/io5';

const labels: { [index: string]: ReactElement } = {
  0.5: <IoSadOutline className="text-rose-900" />,
  1: <IoSadOutline className="text-rose-600" />,
  1.5: <MdOutlineSentimentDissatisfied className="text-red-900" />,
  2: <MdOutlineSentimentDissatisfied className="text-red-600" />,
  2.5: <MdOutlineSentimentNeutral className="text-yellow-900" />,
  3: <MdOutlineSentimentNeutral className="text-yellow-600" />,
  3.5: <BiHappyHeartEyes className="text-green-900" />,
  4: <BiHappyHeartEyes className="text-green-600" />,
  4.5: <MdSentimentVerySatisfied className="text-violet-900" />,
  5: <MdSentimentVerySatisfied className="text-violet-600" />
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Feedbackmodal = () => {
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-5 right-5 rounded-full w-12 h-12 shadow-md z-10"
        >
          <VscFeedback />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>Give your precises feedback for improve our service</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="hover-feedback">
              Rate our service <span className="text-red-600">*</span>
            </Label>
            <div className="flex">
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'gray' }} fontSize="inherit" />}
              />
              {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="message">
              Message <span className="text-red-600">*</span>
            </Label>
            <Input type="text" placeholder="Leave your message" className="h-20" name="message" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Leave feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Feedbackmodal;
