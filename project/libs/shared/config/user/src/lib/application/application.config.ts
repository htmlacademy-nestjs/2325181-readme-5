import { DEFAULT_PORT, ENVIRONMENTS } from './application-config.constant';
import { ApplicationConfig } from './application-config.interface';
import { registerAs } from '@nestjs/config';

type Environment = typeof ENVIRONMENTS[number];

function getConfig(): ApplicationConfig {
  return {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  }
}

export default registerAs('application', getConfig);
