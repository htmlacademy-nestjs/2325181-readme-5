import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/libs/shared/app/types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, SEND_NEW_POSTS_SUBJECT } from './mail.constant';
import { ConfigType } from '@nestjs/config';
import { NotifyConfig } from '@project/libs/shared/config/notify';
import { SendNewPostsDto } from '../subscriber/dto/send-new-posts.dto';

@Injectable()
export class MailService {
  constructor (
    private readonly mailerService: MailerService,
    @Inject(NotifyConfig.KEY)
    private readonly notifyConfig: ConfigType<typeof NotifyConfig>
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: '../assets/add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewPosts ({posts, email}: SendNewPostsDto) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: email,
      subject: SEND_NEW_POSTS_SUBJECT,
      template: '../assets/send-new-posts',
      context: {
        posts,
      }
    })
  }
}
