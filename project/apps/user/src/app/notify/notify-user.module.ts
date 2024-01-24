import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/libs/shared/core';
import { NotifyUserService } from './notify-user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyUserService],
  exports: [NotifyUserService]
})
export class NotifyUserModule {}
