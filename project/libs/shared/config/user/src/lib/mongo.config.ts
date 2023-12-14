import { registerAs } from '@nestjs/config';
import { DEFAULT_MONGO_PORT } from './mongo-config.constant';
import { MongoConfig } from './mongo-config.interface';

function getDbConfig(): MongoConfig {
  return {
    host: process.env.MONGO_HOST!,
    name: process.env.MONGO_DB,
    port: parseInt(process.env.MONGO_PORT && `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env.MONGO_USER!,
    password: process.env.MONGO_PASSWORD!,
    authBase: process.env.MONGO_AUTH_BASE!
  }
}

export default registerAs('db', getDbConfig);
