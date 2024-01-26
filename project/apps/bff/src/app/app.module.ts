import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { UserController } from './controller/user.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CommentController } from './controller/comment.controller';
import { LikeController } from './controller/like.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    })
  ],
  controllers: [
    PostController,
    UserController,
    CommentController,
    LikeController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
