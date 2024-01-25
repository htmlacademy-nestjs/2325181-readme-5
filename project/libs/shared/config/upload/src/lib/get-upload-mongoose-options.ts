import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString} from '@project/libs/shared/helpers';

export function getUploadMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          port: config.get<string>('application.db.port'),
          authDatabase: config.get<string>('application.db.authBase'),
          databaseName: config.get<string>('application.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
