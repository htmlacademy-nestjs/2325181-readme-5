import { RabbitConfig } from './rabbit.env';
import { DEFAULT_RABBIT_PORT } from './rabbit-config.constant';
import { plainToClass } from 'class-transformer';
import { ConfigType, registerAs } from '@nestjs/config';

async function getRabbitConfig(): Promise<RabbitConfig> {
  const rabbitConfig = plainToClass(RabbitConfig, {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(process.env.RABBIT_PORT || `${DEFAULT_RABBIT_PORT}`, 10),
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  });
  await rabbitConfig.validate()
  return rabbitConfig;
}

export default registerAs('rabbit', async(): Promise<ConfigType<typeof getRabbitConfig>> => {
  return getRabbitConfig();
})
