import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString} from '@project/libs/shared/helpers';

export function getUploadMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.dbUser'),
          password: config.get<string>('application.dbPassword'),
          host: config.get<string>('application.dbHost'),
          port: config.get<string>('application.dbPort'),
          authDatabase: config.get<string>('application.dbAuthBase'),
          databaseName: config.get<string>('application.dbName'),
        })
      }
    },
    inject: [ConfigService]
  }
}
