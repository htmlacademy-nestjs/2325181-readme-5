import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import applicationConfig from './application/application.config';
import mongoConfig from './mongodb/mongo.config';
import jwtConfig from './jwt/jwt.config';
import rabbitConfig from './rabbit/rabbit.config';

const ENV_USER_FILE_PATH = 'apps/user/.user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USER_FILE_PATH
    }),
  ]
})
export class ConfigUserModule { }
