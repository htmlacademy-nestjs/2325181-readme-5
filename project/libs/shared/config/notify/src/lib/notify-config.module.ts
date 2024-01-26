import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_NOTIFY_FILE_PATH } from './notify-config.constant';
import notifyConfig from './notify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_NOTIFY_FILE_PATH
    })
  ]
})

export class NotifyConfigModule{}
