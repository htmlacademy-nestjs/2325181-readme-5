import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import applicationConfig from './application/application.config';
import jwtConfig from './jwt/jwt.config';
import rabbitConfig from './rabbit/rabbit.config';

const ENV_POST_FILE_PATH = 'apps/post/.post.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_POST_FILE_PATH
    }),
  ]
})
export class ConfigPostModule { }
