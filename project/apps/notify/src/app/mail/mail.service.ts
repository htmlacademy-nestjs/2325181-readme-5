import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/libs/shared/app/types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { ConfigType } from '@nestjs/config';
import notifyConfig from 'libs/shared/config/notify/src/lib/notify.config';

@Injectable()
export class MailService {
  constructor (
    private readonly mailerService: MailerService,
    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }
}
