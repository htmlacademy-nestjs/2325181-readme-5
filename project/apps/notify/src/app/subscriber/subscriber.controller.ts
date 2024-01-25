import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';
import { SendNewPostsDto } from './dto/send-new-posts.dto';
import { filterNewPosts } from '@project/libs/shared/helpers';

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
  public async create(subscriber: CreateSubscriberDto): Promise<void> {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.posts',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.posts',
  })
  public async sendNewPosts({email, posts}: SendNewPostsDto): Promise<void> {
    const {newPostsUpdate} = await this.subscriberService.findSubscriberByEmail(email);
    const dto: SendNewPostsDto = {email, posts: filterNewPosts(posts, newPostsUpdate)};
    this.mailService.sendNotifyNewPosts(dto);
    this.subscriberService.updateSubscriber(email);
  }
}
