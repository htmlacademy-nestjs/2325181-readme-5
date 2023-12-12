import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController],
  exports: [CommentRepository, CommentService]
})
export class CommentModule {

}
