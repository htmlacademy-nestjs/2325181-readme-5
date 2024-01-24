import { Controller, Param, Get } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';
import { SendNewPostsDto } from './dto/send-new-posts.dto';

@Controller('subscribe')
export class SubscriberController {
  constructor (
    private readonly subscriberService: SubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.income',
  })
  public async sendNewPosts(newPostsUpdate: SendNewPostsDto) {
    this.subscriberService.sendNewPosts(newPostsUpdate.email);
    this.mailService.sendNotifyNewPosts(newPostsUpdate);
  }

  @Get(':email')
  public async countUserSubscribers(@Param('email') email: string): Promise<number> {
    return this.subscriberService.countFollowers(email);
  }
}
