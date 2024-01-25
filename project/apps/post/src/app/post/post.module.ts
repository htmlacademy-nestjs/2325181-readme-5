import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './post.constant';
import { NotifyPostModule } from '../notify/notify-post.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/libs/shared/core';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { PostController } from './post.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyPostModule
  ],
  providers: [PostRepository, PostService, JwtAccessStrategy, CheckAuthGuard],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule {}
