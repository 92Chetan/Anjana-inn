'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { VerifyOtp } from '@/lib/api/auth';
import { verifyOtp } from '@/validation/authSchema';
import Loader from '../utils/Loader';

export const VerifyFrom = () => {
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const route = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') as string;

  const disableSendButton = () => {
    axios.put(`/api/auth/verify?email=${email}`);
    setIsSending(true);
    setCountdown(60);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(countdownInterval);
      setIsSending(false);
    }, 60000);
  };

  const {
    data,
    error: vError,
    isError,
    isSuccess,
    isPending,
    mutate
  } = useMutation({
    mutationFn: VerifyOtp,
    mutationKey: ['verify-otp']
  });

  const form = useForm<z.infer<typeof verifyOtp>>({
    resolver: zodResolver(verifyOtp),
    defaultValues: {
      authCode: ''
    }
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof verifyOtp>) => {
      const newData = { ...values, email };
      mutate(newData);
      form.reset();
    },
    [mutate, form, email]
  );

  useEffect(() => {
    if (isError) {
      toast.error(vError?.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
      route.push('/login');
      route.refresh();
    }
  }, [data?.message, isError, isSuccess, route, vError?.message]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-[1px] max-w-[400px] rounded-lg w-full min-h-[400px] flex justify-center items-center flex-col"
      >
        <h2 className="text-3xl font-semibold uppercase">Verify</h2>
        <FormField
          control={form.control}
          name="authCode"
          render={({ field }) => (
            <FormItem className="min-w-[80%]">
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="Please enter valid otp" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="min-w-[80%] font-bold text-md">
          {isPending ? <Loader /> : 'Submit'}
        </Button>
        <Button
          variant="transparent"
          className="disabled:text-gray-600 text-blue-600 cursor-pointer"
          onClick={disableSendButton}
          disabled={isSending}
        >
          <p>{isSending ? `Resend in ${countdown} seconds` : 'Resend otp'}</p>
        </Button>
      </form>
    </Form>
  );
};
multiplier: 2;
