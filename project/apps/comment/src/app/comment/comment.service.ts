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
    const newComment = await new CommentEntity(commentDraft);
    return this.commentRepository.save(newComment);
  }

  public async deleteComment(commentId: string): Promise<void> {
    const existComment = await this.commentRepository.findById(commentId);
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    this.commentRepository.deleteById(commentId);
  }

  public async listCommentByPostId(postId: string): Promise<CommentEntity[]> {
    const commentsList = await this.commentRepository.findManyByPostId(postId);
    return commentsList;
  }

  public async deleteCommentsByPostId(postId: string): Promise<void> {
    return this.commentRepository.deleteManyByPostId(postId);
  }
}
