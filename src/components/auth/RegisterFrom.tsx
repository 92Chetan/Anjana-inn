'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import Image from 'next/image';

import useFilePreview from '@/hooks/usePreviewImage';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RegisterSchema } from '@/validation/auth/authSchema';

export function RegisterFrom() {
  const route = useRouter();

  const {
    data,
    isError,
    isSuccess,
    error: RegisterError,
    mutate
  } = useMutation({
    mutationFn: CreateUser,
    mutationKey: ['register']
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      avatar: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const fileRef = form.register('avatar');
  const image = form.watch('avatar');

  const filePreview = useFilePreview(image);

  const onSubmit = useCallback(
    (values: z.infer<typeof RegisterSchema>) => {
      const newData = { ...values, avatar: values.avatar[0] };
      mutate(newData);
      form.reset();
    },
    [form, mutate]
  );

  if (isError) {
    toast.error(RegisterError.message);
  }

  if (isSuccess) {
    route.push(`/verify?email=${data.email}`);
    route.refresh;
    toast.success(data.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 border-[1px] max-w-[400px] rounded-lg w-full min-h-[400px] flex justify-center items-center flex-col py-3"
      >
        <h2 className="md:text-3xl text-md font-semibold uppercase">Create an account</h2>
        {filePreview && (
          <Image src={filePreview} alt="preview" width={50} height={50} className="rounded-full" />
        )}
        {filePreview ? null : (
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem className="min-w-[80%]">
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    {...fileRef}
                    type="file"
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="min-w-[80%]">
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="Please enter your name" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="min-w-[80%]">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Please enter your email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="min-w-[80%]">
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="Please enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="min-w-[80%]">
              <FormLabel>confirmPassword</FormLabel>
              <FormControl>
                <Input placeholder="Please re enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="min-w-[80%] font-bold text-md">
          Submit
        </Button>
        <FormDescription className="text-md font-bold">
          Create an account
          <Link href="/sing_up" className="text-blue-500">
            register here
          </Link>
        </FormDescription>
      </form>
    </Form>
  );
}
