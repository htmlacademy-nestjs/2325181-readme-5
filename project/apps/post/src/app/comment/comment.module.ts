import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaClientModule } from '@project/libs/shared/post/models';

@Module({
  imports: [PrismaClientModule],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController],
  exports: [CommentRepository, CommentService]
})
export class CommentModule {}
