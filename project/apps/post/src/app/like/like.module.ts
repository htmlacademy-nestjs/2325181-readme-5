import { Module, forwardRef } from '@nestjs/common';
import { PrismaClientModule } from '@project/libs/shared/post/models';
import { PostModule } from '../post/post.module';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [PrismaClientModule, forwardRef(() => PostModule)],
  providers: [LikeRepository, LikeService],
  controllers: [LikeController],
  exports: [LikeRepository, LikeService]
})
export class LikeModule {}
