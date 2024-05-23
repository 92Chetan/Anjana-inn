import { mkdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import mime from 'mime';

export const UploadImage = async (image: File) => {
  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = '/uploads';
  const uploadDir = join(process.cwd(), '/', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.log('Error while trying to create directory when uploading a file\n', error);
      return null;
    }
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${image.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);

  const fileName = `${relativeUploadDir}/${filename}`;
  return fileName;
};
