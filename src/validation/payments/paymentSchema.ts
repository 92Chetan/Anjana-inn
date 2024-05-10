import { z } from 'zod';

export const paymentSchema = z.object({
  plan_id: z.string({ required_error: 'Please Provide plan id' })
});
