import { z } from 'zod';

export const RoomSchema = z.object({
  roomType: z.string(),
  onstock: z.string(),
  roomLable: z.string()
});
