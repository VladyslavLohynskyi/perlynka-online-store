import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';
import ApiError from '../exceptions/ApiError';
import fs from 'fs';

class fileUploadService {
   bucketName: string;
   storage: Storage;
   constructor() {
      this.bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
      console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH);
      console.log(
         fs.readFileSync(
            process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH,
            'utf8',
         ),
      );

      this.storage = new Storage({
         projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
         keyFilename:
            process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH || './src/key.json',
      });
   }

   async uploadPhoto(file: sharp.Sharp, fileName: string, path: string) {
      const bucket = this.storage.bucket(this.bucketName);
      const blob = bucket.file(path + '/' + fileName + '.webp');
      const blobStream = blob.createWriteStream({
         resumable: true,
         metadata: {
            cacheControl: 'no-cache',
         },
      });
      const bufferedFile = await file.toBuffer();

      return new Promise((resolve, reject) => {
         blobStream
            .on('finish', () => {
               const publicUrl = `${process.env.GOOGLE_CLOUD_STORAGE_BASE_URL}/${this.bucketName}/${blob.name}`;
               resolve(publicUrl);
            })
            .on('error', (err) => {
               reject(() => {
                  throw ApiError.internalServer('Error uploading photo');
               });
            })
            .end(bufferedFile);
      });
   }
   async deleteFile(fileName: string, path: string): Promise<void> {
      try {
         await this.storage
            .bucket(this.bucketName)
            .file(path + '/' + fileName + '.webp')
            .delete();
      } catch (error) {
         throw ApiError.internalServer(`Failed to delete file ${fileName}`);
      }
   }
}

export default new fileUploadService();
