import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/libs/shared/core';
import { NotifyPostService } from './notify-post.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyPostService],
  exports: [NotifyPostService]
})
export class NotifyPostModule {}
