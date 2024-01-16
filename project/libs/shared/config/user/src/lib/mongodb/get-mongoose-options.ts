import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString} from '@project/libs/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('dbUser'),
          password: config.get<string>('dbPassword'),
          host: config.get<string>('dbHost'),
          port: config.get<string>('dbPort'),
          authDatabase: config.get<string>('dbAuthBase'),
          databaseName: config.get<string>('dbName'),
        })
      }
    },
    inject: [ConfigService]
  }
}
