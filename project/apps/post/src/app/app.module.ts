import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';


@Module({
  imports: [PostModule],
  controllers: [],
  providers: [PostService],
  exports: [PostModule]
})
export class AppModule {}
