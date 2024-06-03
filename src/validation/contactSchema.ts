import { z } from 'zod';
import validator from 'validator';

export const contactSchema = z.object({
  fullName: z
    .string({ required_error: 'Please enter your first Name' })
    .min(3, { message: 'Please Enter minimum 3 latter' })
    .max(25, { message: 'your first name is too long' }),
  phone: z
    .string({ required_error: 'Please enter your phone number' })
    .refine(validator.isMobilePhone),
  email: z
    .string({ required_error: 'Please Enter your email' })
    .email({ message: 'Please enter your valid email' }),

  message: z
    .string({ required_error: 'Please enter your message' })
    .min(5, { message: 'Please write minimum 5 letter' })
});
