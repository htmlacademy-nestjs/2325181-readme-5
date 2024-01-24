import { Module, forwardRef } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaClientModule } from '@project/libs/shared/post/models';
import { PostModule } from '../post/post.module';
import {getJwtOptions} from '@project/libs/shared/core';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT} from '../app.config'

@Module({
  imports: [
    PrismaClientModule,
    forwardRef(() => PostModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  providers: [CommentRepository, CommentService, CheckAuthGuard, JwtAccessStrategy],
  controllers: [CommentController],
  exports: [CommentRepository, CommentService]
})
export class CommentModule {}

