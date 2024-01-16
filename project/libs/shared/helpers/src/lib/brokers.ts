import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}Queue`),
          type: 'direct'
        }
      ],
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}Host`),
        password: config.get<string>(`${optionSpace}Password`),
        user: config.get<string>(`${optionSpace}User`),
        port: config.get<string>(`${optionSpace}Port`),
      }),
      connectionInitOptions: {wait: true},
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
