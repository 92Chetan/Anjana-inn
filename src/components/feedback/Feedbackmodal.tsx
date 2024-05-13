'use client';
import React, { useCallback } from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { VscFeedback } from 'react-icons/vsc';
import { usePathname } from 'next/navigation';

import { feedbackSchema } from '@/validation/feedback/feedbackShema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { feedback } from '@/lib/api/feedback';
import { disableNavWithFooter } from '../utils/disableNavWithFooter';

const Feedbackmodal = () => {
  const path = usePathname();

  const { mutate, isSuccess, isError, isPending, error, data } = useMutation({
    mutationFn: feedback,
    mutationKey: ['contactRq']
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: '',
      message: ''
    }
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof feedbackSchema>) => {
      mutate(values);
      reset();
    },
    [reset, mutate]
  );

  if (isError) {
    toast.error(error.message);
  }

  if (isSuccess) {
    toast.success(data.message);
  }

  return (
    <React.Fragment>
      {!disableNavWithFooter.includes(path) && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="transparent"
              className="fixed md:bottom-8 md:right-5 right-0 z-10 gap-1 group bottom-4">
              <p className="group-hover:bg-accent group-hover:text-accent-foreground px-2 py-2 bg-background rounded-lg">
                Leave Feedback
              </p>
              <div className="flex justify-center items-center w-16 h-16 rounded-full bg-background group-hover:bg-accent group-hover:text-accent-foreground">
                <VscFeedback />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
              <DialogDescription>
                Give your precises feedback for improve our service
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="rating">
                  Rate our service <span className="text-red-600">*</span>
                </Label>
                <div>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Rating
                        name="rating"
                        //@ts-ignore
                        value={value}
                        helperText={error ? error.message : null}
                        precision={0.5}
                        defaultValue={3}
                        onChange={onChange}
                        emptyIcon={
                          <StarIcon style={{ opacity: 0.55, color: 'gray' }} fontSize="inherit" />
                        }
                      />
                    )}
                  />
                  {errors && <p className="text-rose-700">{errors.rating?.message}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="message">
                  Message <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Leave your message"
                  className="h-20"
                  {...register('message')}
                />
                {errors && <p className="text-rose-700">{errors.message?.message}</p>}
              </div>
              <Button type="submit">{isPending ? 'loading...' : 'Leave feedback'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default Feedbackmodal;
