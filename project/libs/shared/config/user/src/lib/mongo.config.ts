import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_MONGO_PORT } from './mongo-config.constant';
import { plainToClass } from 'class-transformer';
import { MongoConfiguration } from './mongodb/mongo.env';


async function getDbConfig(): Promise<MongoConfiguration> {
  const mongoConfig = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST!,
    name: process.env.MONGO_DB,
    port: parseInt(process.env.MONGO_PORT && `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env.MONGO_USER!,
    password: process.env.MONGO_PASSWORD!,
    authBase: process.env.MONGO_AUTH_BASE!
  });
  await mongoConfig.validate();
  return mongoConfig;
}

export default registerAs('db', async(): Promise<ConfigType<typeof getDbConfig>> => {
  return getDbConfig()
});
