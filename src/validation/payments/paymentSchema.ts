import { z } from 'zod';

export const paymentSchema = z.object({
  plan_id: z.string({ required_error: 'Please Provide plan id' }).optional(),
  entity: z.string({ required_error: 'Please select entity' }),
  amount: z.number({ required_error: 'Please enter amount' }).optional()
});
