import { writeFile } from 'node:fs/promises';
import { join } from 'path';
import mime from 'mime';

export const UploadImage = async (image: File) => {
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = 'uploads';
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(join(uploadDir, filename), buffer);

    const fileName = `${relativeUploadDir}/${filename}`;
    return fileName;
  } catch (error) {
    console.error('Error during file upload:', error);
    throw new Error('Failed to upload image');
  }
};
