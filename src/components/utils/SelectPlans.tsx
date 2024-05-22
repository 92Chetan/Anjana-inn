'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Calender from '../plane/Calender';
import React, { useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useTermsModal } from '@/hooks/useTerms';

export type qrData = {
  duration: string;
  room: string;
  startDate: number | undefined;
  endDate: number | undefined;
  price: number;
  wifi: boolean;
  user_id: string | undefined;
};

interface selectFormProps {
  user_id: string | undefined;
}

const FormSchema = z.object({
  duration: z.string({
    required_error: 'Please select an email to display.'
  }),
  room: z.string({
    required_error: 'Please select an email to display.'
  })
});

export function SelectForm({ user_id }: selectFormProps) {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [wifi, setWifi] = useState<boolean>(false);
  const { onOpen, setData } = useTermsModal();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const durationRef = form.register('duration');
  const DurationWatch = form.watch('duration');
  const roomRef = form.register('room');
  const RoomWatch = form.watch('room');

  const currentDate = moment().unix();
  const oneDayLater = moment().add(1, 'day').unix();
  const oneYearLater = moment().add(1, 'year').unix();
  const oneMonthLater = moment().add(1, 'month').startOf('day').unix();
  const ThreeMonthLater = moment().add(3, 'months').unix();

  useEffect(() => {
    if (DurationWatch === 'custom') {
      setWifi(false);
    }
  }, [DurationWatch]);

  useEffect(() => {
    switch (true) {
      case DurationWatch === 'daily' && RoomWatch === 'double':
        setPrice(200);
        console.log(currentDate);
        setStartDate(currentDate);
        setEndDate(oneDayLater);
        setWifi(true);
        break;
      case DurationWatch === 'daily' && RoomWatch === 'triple':
        setPrice(200);
        setStartDate(currentDate);
        setEndDate(oneDayLater);
        setWifi(true);
        break;
      case DurationWatch === 'monthly' && RoomWatch === 'single':
        setPrice(1500);
        setStartDate(currentDate);
        console.log(oneMonthLater);
        setEndDate(oneMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'monthly' && RoomWatch === 'double':
        setPrice(2000);
        setStartDate(currentDate);
        setEndDate(oneMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'monthly' && RoomWatch === 'triple':
        setPrice(2000);
        setStartDate(currentDate);
        setEndDate(oneMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'quarterly' && RoomWatch === 'single':
        setPrice(3750);
        setStartDate(currentDate);
        setEndDate(ThreeMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'quarterly' && RoomWatch === 'double':
        setPrice(5000);
        setStartDate(currentDate);
        setEndDate(ThreeMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'quarterly' && RoomWatch === 'triple':
        setPrice(5000);
        setStartDate(currentDate);
        setEndDate(ThreeMonthLater);
        setWifi(true);
        break;
      case DurationWatch === 'yearly' && RoomWatch === 'single':
        setPrice(16500);
        setStartDate(currentDate);
        setEndDate(oneYearLater);
        setWifi(true);
        break;
      case DurationWatch === 'yearly' && RoomWatch === 'double':
        setPrice(22000);
        setStartDate(currentDate);
        setEndDate(oneYearLater);
        setWifi(true);
        break;
      case DurationWatch === 'yearly' && RoomWatch === 'double':
        setPrice(22000);
        setStartDate(currentDate);
        setEndDate(oneYearLater);
        setWifi(true);
        break;
      case DurationWatch === 'custom' && RoomWatch === 'double':
        setStartDate(moment(range[0].startDate).unix());
        setEndDate(moment(range[0].endDate).unix());
        const differentBetweenDays =
          moment(range[0].endDate).diff(moment(range[0].startDate), 'days') + 1;

        if (wifi) {
          const totalPrice = 61 * differentBetweenDays + 5 * differentBetweenDays;
          setPrice(totalPrice);
        } else {
          const totalPrice = 61 * differentBetweenDays;
          setPrice(totalPrice);
        }
        break;
      case DurationWatch === 'custom' && RoomWatch === 'triple':
        setStartDate(moment(range[0].startDate).unix());
        setEndDate(moment(range[0].endDate).unix());
        const differentTBetweenDays =
          moment(range[0].endDate).diff(moment(range[0].startDate), 'days') + 1;

        if (wifi) {
          const totalPrice = 61 * differentTBetweenDays + 5 * differentTBetweenDays;
          setPrice(totalPrice);
        } else {
          const totalTPrice = 61 * differentTBetweenDays;
          setPrice(totalTPrice);
        }
        break;
      default:
        setWifi(false);
        setPrice(0);
    }
  }, [
    DurationWatch,
    RoomWatch,
    ThreeMonthLater,
    currentDate,
    oneDayLater,
    oneMonthLater,
    oneYearLater,
    price,
    range,
    wifi
  ]);

  function onSubmit(value: z.infer<typeof FormSchema>) {
    if (value.duration === 'custom' && value.room === 'single') {
      return toast('please select all fields');
    } else if (value.duration === 'daily' && value.room === 'single') {
      return toast('please select all fields');
    } else {
      const formData: qrData = {
        duration: value.duration,
        room: value.room,
        endDate: endDate,
        startDate: startDate,
        price: price,
        wifi: wifi,
        user_id
      };
      setData(formData);
      onOpen();
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent {...durationRef}>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {DurationWatch === 'custom' && (
            <Calender value={range} onChange={(value) => setRange([value.selection])} />
          )}
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent {...roomRef}>
                    {DurationWatch !== 'daily' && DurationWatch !== 'custom' && (
                      <SelectItem value="single">Single occupancy</SelectItem>
                    )}
                    <SelectItem value="double">Double occupancy</SelectItem>
                    <SelectItem value="triple">Triple occupancy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {DurationWatch === 'custom' && (
            <input
              type="checkbox"
              onClick={(e: any) => {
                if (e.target?.checked) {
                  setWifi(true);
                } else {
                  setWifi(false);
                }
              }}
            />
          )}
          <p>Price - &#8377; {price}</p>

          <Button type="submit">Read Terms and condition and pay</Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
