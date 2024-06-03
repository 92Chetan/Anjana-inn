import { z } from 'zod';

export const RoomSchema = z.object({
  roomType: z.string(),
  onstock: z.string(),
  roomLable: z.string()
});

export const FormSchema = z.object({
  duration: z.string({
    required_error: 'Please select an email to display.'
  }),
  room: z.string({
    required_error: 'Please select an email to display.'
  })
});
