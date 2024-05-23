'use client';
import React, { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { contactSchema } from '@/validation/contact/contactSchema';
import { contactRequest } from '@/lib/api/contactUs';
import Loader from '../utils/Loader';

const ContactForm = () => {
  const { mutate, isSuccess, isError, isPending, error, data } = useMutation({
    mutationFn: contactRequest,
    mutationKey: ['contactRq']
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof contactSchema>) => {
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
    <div className="max-w-lg max-h-[550px] dark:bg-zinc-800 bg-zinc-300 shadow-2xl rounded-lg flex justify-center transition-all duration-75 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 mx-4 my-8 w-full">
        <div>
          <Label htmlFor="firstName">
            Full Name<span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white border-black"
            type="text"
            placeholder="Enter your full name"
            {...register('fullName')}
          />
          {errors && <p className="text-rose-700">{errors.fullName?.message}</p>}
        </div>
        <div>
          <Label htmlFor="firstName">
            Phone<span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white border-black"
            type="text"
            placeholder="Enter your mobile number"
            {...register('phone')}
          />
          {errors && <p className="text-rose-700">{errors.phone?.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">
            Email<span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white border-black"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors && <p className="text-rose-700">{errors.email?.message}</p>}
        </div>
        <div>
          <Label htmlFor="firstName">
            Message <span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white h-32 border-black"
            placeholder="I am interested in learning more about..."
            type="text"
            {...register('message')}
          />
          {errors && <p className="text-rose-700">{errors.message?.message}</p>}
        </div>
        <Button type="submit">{isPending ? <Loader /> : 'Send Message'}</Button>
      </form>
    </div>
  );
};

export default ContactForm;
