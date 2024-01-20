import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { rabbitConfig } from '@project/libs/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NotifyUserService {
  constructor (
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      {...dto}
    );
  }
}
