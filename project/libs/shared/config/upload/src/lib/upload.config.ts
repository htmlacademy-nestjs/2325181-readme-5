import { DEFAULT_UPLOAD_PORT, Environment } from './upload-config.constant';
import { UploadConfig } from './upload.env';
import { plainToClass } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

async function getUploadConfig(): Promise<UploadConfig> {
  const uploadConfig = plainToClass(UploadConfig, {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_UPLOAD_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  })
  await uploadConfig.validate();
  return uploadConfig;
}

export default registerAs('upload', async(): Promise<ConfigType<typeof getUploadConfig>> => {
  return getUploadConfig()
});
