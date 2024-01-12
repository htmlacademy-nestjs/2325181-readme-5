import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClientModule } from '@project/libs/shared/post/models';
import { CommentModule } from '../comment/comment.module';


@Module({
  imports: [PrismaClientModule, CommentModule],
  providers: [PostRepository, PostService],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule {}
