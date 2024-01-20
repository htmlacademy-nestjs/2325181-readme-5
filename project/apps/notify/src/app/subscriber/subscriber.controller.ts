import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller()
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
}
