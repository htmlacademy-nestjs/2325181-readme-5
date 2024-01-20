import { Module, forwardRef } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaClientModule } from '@project/libs/shared/post/models';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PrismaClientModule, forwardRef(() => PostModule)],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController],
  exports: [CommentRepository, CommentService]
})
export class CommentModule {}
