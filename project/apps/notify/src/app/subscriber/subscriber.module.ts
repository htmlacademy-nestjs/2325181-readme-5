import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberService } from './subscriber.service';
import { SubscriberRepository } from './subscriber.repository';
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/libs/shared/helpers';
import { SubscriberController } from './subscriber.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema}
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [
    SubscriberController,
  ],
  providers: [
    SubscriberService, SubscriberRepository
  ]
})
export class SubscriberModule {}
