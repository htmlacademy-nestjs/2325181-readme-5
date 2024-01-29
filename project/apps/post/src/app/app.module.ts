import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { NotifyPostModule } from './notify/notify-post.module';
import { ConfigPostModule } from '@project/libs/shared/config/post';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PrismaModule, PostModule, CommentModule, ConfigPostModule, LikeModule, NotifyPostModule],
  controllers: [],
  providers: []
})
export class AppModule {}
