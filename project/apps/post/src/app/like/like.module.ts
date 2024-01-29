import { Module, forwardRef } from '@nestjs/common';
import { PrismaClientModule } from '@project/libs/shared/post/models';
import { PostModule } from '../post/post.module';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT} from '../app.config'

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    forwardRef(() => PostModule)
  ],
  providers: [LikeRepository, LikeService],
  controllers: [LikeController],
  exports: [LikeRepository, LikeService]
})
export class LikeModule {}
