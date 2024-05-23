'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { VerifyOtp } from '@/lib/api/auth';
import { verifyOtp } from '@/validation/auth/authSchema';
import Loader from '../utils/Loader';

export const VerifyFrom = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') as string;

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

  if (isError) {
    toast.error(vError.message);
  }

  if (isSuccess) {
    toast.success(data.message);
    route.push('/login');
    route.refresh();
  }

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
      </form>
    </Form>
  );
};
