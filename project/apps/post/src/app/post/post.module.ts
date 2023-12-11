import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';


@Module({
  providers: [PostRepository, PostService],
  controllers: [ PostController],
  exports: [PostRepository, PostService]
})
export class PostModule {

}
