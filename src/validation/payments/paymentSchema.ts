import { z } from 'zod';

export const paymentSchema = z.object({
  plan_id: z.string().optional(),
  entity: z.string({ required_error: 'Please select entity' }),
  amount: z.number().optional(),
  startAt: z.number().optional(),
  endAt: z.number().optional(),
  addon: z.boolean()
});
