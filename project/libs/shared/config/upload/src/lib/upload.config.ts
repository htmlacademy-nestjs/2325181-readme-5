import { DEFAULT_UPLOAD_PORT, Environment, DEFAULT_MONGO_PORT } from './upload-config.constant';
import { UploadConfig } from './upload.env';
import { plainToClass } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

async function getUploadConfig(): Promise<UploadConfig> {
  const uploadConfig = plainToClass(UploadConfig, {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_UPLOAD_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    dbHost: process.env.MONGO_HOST,
    dbPort: parseInt(process.env.MONGO_PORT || `${DEFAULT_MONGO_PORT}`, 10),
    dbUser: process.env.MONGO_USER,
    dbName: process.env.MONGO_DB,
    dbPassword: process.env.MONGO_PASSWORD,
    dbAuthBase: process.env.MONGO_AUTH_BASE
  })
  await uploadConfig.validate();
  return uploadConfig;
}

export default registerAs('upload', async(): Promise<ConfigType<typeof getUploadConfig>> => {
  return getUploadConfig()
});
