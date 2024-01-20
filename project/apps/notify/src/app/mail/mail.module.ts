import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from '@project/libs/shared/config/notify';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
