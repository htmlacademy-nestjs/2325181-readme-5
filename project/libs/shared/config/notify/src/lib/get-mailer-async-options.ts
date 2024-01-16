import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import * as path from 'node:path';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (configservice: ConfigService) => {
      return {
        transport: {
          host: configservice.get<string>(`${optionSpace}Host`),
          port: configservice.get<number>(`${optionSpace}Port`),
          secure: false,
          auth: {
            user: configservice.get<string>(`${optionSpace}User`),
            pass: configservice.get<string>(`${optionSpace}Password`),
          }
        },
        defaults: {
          from: configservice.get<string>('mailFrom')
        },
        template: {
          dir: path.resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService],
  }
}
