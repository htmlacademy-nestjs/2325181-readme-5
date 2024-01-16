import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber/subscriber.service';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './subscriber/create-subscriber.dto';

@Controller()
export class SubscriberController {
  constructor (
    private readonly subscriberService: SubscriberService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }
}
