import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z.string().email({ message: 'This is not valid email' }),
  message: z.string().min(10, { message: 'message must be 10 characters' })
});
