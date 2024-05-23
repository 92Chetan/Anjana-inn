'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { MutationCache } from '@tanstack/react-query';

import '@uploadthing/react/styles.css';
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
import Loader from '../utils/Loader';
import { uploadFiles } from '@/lib/ImageUpload';

export function RegisterFrom() {
  const route = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [imageUpload, setImageUpload] = useState<boolean>();
  const imageRef = useRef<HTMLInputElement | null>(null);

  const {
    data,
    isError,
    isSuccess,
    error: RegisterError,
    isPending,
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

  const onSubmit = useCallback(
    (values: z.infer<typeof RegisterSchema>) => {
      if (avatarUrl) {
        const newData = { ...values, avatar: avatarUrl };
        mutate(newData);
      } else {
        toast.error('select image');
      }
    },
    [avatarUrl, mutate]
  );

  const handleIconClick = () => {
    imageRef.current?.click();
  };

  useEffect(() => {
    const mutationCache = new MutationCache({
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      }
    });
    if (isError) {
      toast.error(RegisterError?.message);
      // Handle error state
    }
    if (isSuccess && data) {
      route.push(`/verify?email=${data?.email}`);
      route.refresh(); // Corrected function call
      toast.success(data?.message);
      // Handle success state
    }
    if (isSuccess || isError) {
      // Reset form after success or error
      form.reset();
      mutationCache.clear();
    }
  }, [RegisterError?.message, isError, isSuccess, data, route, form]);
  console.log('Avatar URL:', avatarUrl);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 border-[1px] max-w-[400px] rounded-lg w-full min-h-[400px] flex justify-center items-center flex-col py-3"
      >
        <h2 className="md:text-3xl text-md font-semibold uppercase">Create an account</h2>

        <label htmlFor="avata">Avatar</label>
        {imageUpload ? (
          <Loader />
        ) : (
          <Image
            src={avatarUrl ? avatarUrl : '/images/avatar.jpeg'}
            alt="preview"
            width={50}
            height={50}
            className="rounded-full"
            onClick={handleIconClick}
          />
        )}

        <input
          ref={imageRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={async (event) => {
            if (event.target.files && event.target.files.length > 0) {
              const files = Array.from(event.target.files);
              setImageUpload(true); // Set imageUpload to true before starting upload
              try {
                const res = await uploadFiles('imageUploader', { files: files });
                if (res) {
                  setAvatarUrl(res[0].url);
                }
              } catch (error) {
                console.error('Error uploading files:', error);
              } finally {
                setImageUpload(false);
              }
            }
          }}
          name="avatar"
        />

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
          {isPending ? <Loader /> : 'Submit'}
        </Button>
        <FormDescription className="text-md font-bold">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            Login here
          </Link>
        </FormDescription>
      </form>
    </Form>
  );
}
