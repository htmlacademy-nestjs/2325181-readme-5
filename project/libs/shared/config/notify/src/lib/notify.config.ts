import { DEFAULT_NOTIFY_PORT, DEFAULT_RABBIT_PORT, DEFAULT_SMTP_PORT, Environment, DEFAULT_MONGO_PORT } from './notify-config.constant';
import { NotifyConfig } from './notify.env';
import { plainToClass } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

async function getNotifyConfig(): Promise<NotifyConfig> {
  const notifyConfig = plainToClass(NotifyConfig, {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_NOTIFY_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    dbHost: process.env.MONGO_HOST,
    dbPort: parseInt(process.env.MONGO_PORT || `${DEFAULT_MONGO_PORT}`, 10),
    dbUser: process.env.MONGO_USER,
    dbName: process.env.MONGO_DB,
    dbPassword: process.env.MONGO_PASSWORD,
    dbAuthBase: process.env.MONGO_AUTH_BASE,
    rabbitHost: process.env.RABBIT_HOST,
    rabbitPassword: process.env.RABBIT_PASSWORD,
    rabbitPort: parseInt(process.env.RABBIT_PORT || `${DEFAULT_RABBIT_PORT}`, 10),
    rabbitUser: process.env.RABBIT_USER,
    rabbitQueue: process.env.RABBIT_QUEUE,
    rabbitExchange: process.env.RABBIT_EXCHANGE,
    mailHost: process.env.MAIL_SMTP_HOST,
    mailPort: parseInt(process.env.MAIL_SMTP_PORT || `${DEFAULT_SMTP_PORT}`, 10),
    mailUser: process.env.MAIL_USER_NAME,
    mailPassword: process.env.MAIL_USER_PASSWORD,
    mailFrom: process.env.MAIL_FROM,
  })
  await notifyConfig.validate();
  return notifyConfig;
}

export default registerAs('notify', async(): Promise<ConfigType<typeof getNotifyConfig>> => {
  return getNotifyConfig();
});
