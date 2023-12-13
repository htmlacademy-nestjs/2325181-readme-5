import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types'
import { randomUUID } from 'crypto';

export class ImageService {
  public async uploadImage(uploadDirectory: string, fieldName: string) {
    const storage = diskStorage({
      destination: uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = randomUUID();
        callback(null, `${filename}.${fileExtension}`);
      }
    });
    return multer({storage}).single(fieldName);
  }
}
