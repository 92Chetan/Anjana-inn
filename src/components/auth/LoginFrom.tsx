'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { loginSchema } from '@/validation/auth/authSchema';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginFrom() {
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    signIn('credentials', { ...values, redirect: false }).then((callback) => {
      setLoading(false);
      if (callback?.ok) {
        route.push('/');
        route.refresh();
        //TODO: add toast here
      }
      if (callback?.error) {
        //TODO:add toast
        console.log(callback.error);
      }
    });
  }

  useEffect(() => {
    if (status === 'authenticated') {
      route.push('/');
    }
  }, [status, route]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-[1px] max-w-[400px] rounded-lg w-full min-h-[400px] flex justify-center items-center flex-col"
      >
        <h2 className="text-3xl font-semibold uppercase">Welcome back</h2>
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
        <Button type="submit" className="min-w-[80%] font-bold text-md">
          {loading ? 'loading...' : 'Submit'}
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
