import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { COMMENT_NOT_FOUND } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async createNewComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const {postId, text} = dto;
    const commentDraft = {
      text,
      postId
    }
    const newComment = new CommentEntity(commentDraft);
    return await this.commentRepository.save(newComment);
  }

  public async deleteComment(commentId: string): Promise<void> {
    const existComment = await this.commentRepository.findById(commentId);
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    this.commentRepository.deleteById(commentId);
  }

  public async listCommentByPostId(postId: string): Promise<CommentEntity[]> {
    return await this.commentRepository.findManyByPostId(postId);
  }

  public async deleteCommentsByPostId(postId: string): Promise<void> {
    this.commentRepository.deleteManyByPostId(postId);
  }
}
