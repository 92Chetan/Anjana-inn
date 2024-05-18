import { z } from 'zod';

const values = ['daily', 'monthly', 'quarterly', 'annual', 'custom'] as const;

export const billSchema = z.object({
  price: z.number({ required_error: 'Please enter price' }),
  timeline: z.enum(values, { required_error: 'Please enter your plans time line' }),
  typeofRoom: z.string({ required_error: 'Please room type' }).optional(),
  entity: z.string({ required_error: 'Please enter your type planes like subscribe or order' }),
  plan_id: z.string({ required_error: 'Please enter plan_id' }).optional(),
  roomType: z
    .array(
      z.object({
        title: z.string({ required_error: 'Please enter room type' }),
        price: z.number({ required_error: 'Please enter price' })
      }),
      { required_error: 'Please provide roomType' }
    )
    .optional(),
  service: z.array(
    z.object({
      title: z.string({
        required_error: 'Please enter your service name'
      }),
      value: z.any({
        required_error: 'Please enter your service value'
      })
    }),
    { required_error: 'Please provide service' }
  )
});
