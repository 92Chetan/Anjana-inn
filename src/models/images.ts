import { z } from 'zod';

const BasicImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number()
});
const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    original: z.string()
  }),
  alt: z.string(),
  blurredDataUrl: z.string().optional()
});

export const ImageSchemaWithPhotos = BasicImageSchema.extend({
  photos: z.array(PhotoSchema)
});

export type photo = z.infer<typeof PhotoSchema>;

export type ImageResult = z.infer<typeof ImageSchemaWithPhotos>;
