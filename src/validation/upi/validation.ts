import { z } from 'zod';

export const upiSchema = z.object({
  price: z.number(),
  terms: z.boolean(),
  wifi: z.boolean(),
  startDate: z.number(),
  endDate: z.number(),
  duration: z.string(),
  room: z.string(),
  user_id: z.string()
});
