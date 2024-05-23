import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'path';
import mime from 'mime';

export const UploadImage = async (image: File) => {
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = 'uploads'; // Remove the leading slash
    const uploadDir = join(process.cwd(), relativeUploadDir); // Join with cwd

    try {
      await stat(uploadDir);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // Create directory if it doesn't exist
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.log('Error while trying to create directory when uploading a file\n', error);
        throw new Error('Failed to create upload directory');
      }
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(join(uploadDir, filename), buffer); // Join with directory path

    const fileName = `${relativeUploadDir}/${filename}`;
    return fileName;
  } catch (error) {
    console.error('Error during file upload:', error);
    throw new Error('Failed to upload image');
  }
};
