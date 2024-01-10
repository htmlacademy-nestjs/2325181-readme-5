import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClientModule } from '@project/libs/shared/post/models';


@Module({
  imports: [PrismaClientModule],
  providers: [PostRepository, PostService],
  controllers: [ PostController],
  exports: [PostRepository, PostService]
})
export class PostModule {}
