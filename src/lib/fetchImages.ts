import type { ImageResult } from '@/models/images';
import { ImageSchemaWithPhotos } from '@/models/images';

export async function fetchImage(url: string): Promise<ImageResult | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: process.env.API_KEY as string
      }
    });
    if (!res.ok) {
      throw new Error('Fetch Images error');
    }

    const imageResult: ImageResult = await res.json();

    const parsedData = ImageSchemaWithPhotos.parse(imageResult);

    if (parsedData.total_results === 0) {
      return undefined;
    }
    return imageResult;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}
