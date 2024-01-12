import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export function getUploadOptions(configService: ConfigService): MongooseModuleAsyncOptions {
  return {

  }
}
