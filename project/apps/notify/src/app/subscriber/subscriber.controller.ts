import { Controller, Param, Get, Body, Post } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';
import { SendNewPostsDto } from './dto/send-new-posts.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

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
    exchange: 'readme.notify.posts',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.posts',
  })
  public async sendNewPosts(newPostsUpdate: SendNewPostsDto) {
    this.subscriberService.updateSubscriber(newPostsUpdate.email);
    this.mailService.sendNotifyNewPosts(newPostsUpdate);
  }

  @Get(':email')
  public async countUserSubscribers(@Param('email') email: string): Promise<number> {
    return this.subscriberService.countFollowers(email);
  }

  @Post('add')
  public async addSubscription(@Body() dto: UpdateSubscriptionDto): Promise<void> {
    const {email, emailSubscribe} = dto;
    await this.subscriberService.addSubscription(email, emailSubscribe);
  }
}
