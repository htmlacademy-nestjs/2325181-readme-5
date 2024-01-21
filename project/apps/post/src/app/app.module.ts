import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';
import { PostRepository } from './post/post.repository';
import { LikeModule } from './like/like.module';
import { NotifyPostModule } from './notify/notify-post.module';
import { NotifyPostService } from './notify/notify-post.service';


@Module({
  imports: [PostModule, CommentModule],
  controllers: [],
  providers: []
})
export class AppModule {}
