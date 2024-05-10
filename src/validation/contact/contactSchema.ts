import { z } from 'zod';

export const contactSchema = z.object({
  first_name: z
    .string({ required_error: 'Please enter your first Name' })
    .min(3, { message: 'Please Enter minimum 3 latter' })
    .max(25, { message: 'your first name is too long' }),

  last_name: z
    .string({ required_error: 'Please enter your last Name' })
    .min(3, { message: 'Please Enter minimum 3 latter' })
    .max(25, { message: 'your last name is too long' }),

  email: z
    .string({ required_error: 'Please Enter your email' })
    .email({ message: 'Please enter your valid email' }),

  message: z
    .string({ required_error: 'Please enter your message' })
    .min(5, { message: 'Please write minimum 5 letter' })
});
