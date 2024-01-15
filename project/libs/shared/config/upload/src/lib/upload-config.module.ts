import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import uploadConfig from './upload.config';
import { ENV_FILE_PATH } from './upload-config.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [uploadConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})

export class UploadConfigModule{}
