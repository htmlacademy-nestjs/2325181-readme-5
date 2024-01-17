import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFY_ENV_FILE_PATH } from './notify-config.constant';
import notifyConfig from './notify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: NOTIFY_ENV_FILE_PATH
    })
  ]
})

export class NotifyConfigModule{}
