import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { rabbitConfig } from '@project/libs/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { SendNewPostsDto } from './dto/send-new-posts.dto';

@Injectable()
export class NotifyPostService {
  constructor (
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPosts(dto: SendNewPostsDto) {
    return this.rabbitClient.publish<SendNewPostsDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPosts,
      {...dto}
    );
  }
}
