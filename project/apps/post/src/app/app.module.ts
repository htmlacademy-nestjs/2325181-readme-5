import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';


@Module({
  imports: [PostModule, CommentModule],
  controllers: [],
  providers: [PostService, CommentService],
  exports: [PostModule, CommentService]
})
export class AppModule {}
