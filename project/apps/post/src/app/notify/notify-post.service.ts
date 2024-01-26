import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { rabbitConfig } from '@project/libs/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { PostContent, RabbitRouting } from '@project/libs/shared/app/types';

@Injectable()
export class NotifyPostService {
  constructor (
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPosts(posts: PostContent[]) {
    return this.rabbitClient.publish<PostContent[]>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPosts,
      posts
    );
  }
}
