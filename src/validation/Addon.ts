import { z } from 'zod';

export const Addon = z.object({
  price: z.number(),
  id: z.string()
});
