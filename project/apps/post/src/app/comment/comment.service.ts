import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { COMMENT_NOT_FOUND, POST_FOR_COMMENT_NOT_FOUND, USER_UNAUTHORIZED } from './comment.constant';
import { PostService } from '../post/post.service';
import { FilterQuery } from './query/filter.query';
import { PaginationResult } from '@project/libs/shared/app/types';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  public async createNewComment(dto: CreateCommentDto, userId: string): Promise<CommentEntity> {
    const {postId, text} = dto;
    const existPost = await this.postService.getPostEntity(postId);
    if (!existPost) {
      throw new NotFoundException(POST_FOR_COMMENT_NOT_FOUND);
    }
    const commentDraft = {
      text,
      postId,
      userId
    }
    const newComment = new CommentEntity(commentDraft);
    return await this.commentRepository.save(newComment);
  }

  public async deleteComment(commentId: string, userId: string): Promise<void> {
    const existComment = await this.commentRepository.findById(commentId);
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    if (existComment.userId !== userId) {
      throw new UnauthorizedException(USER_UNAUTHORIZED);
    }
    await this.commentRepository.deleteById(commentId);
  }

  public async listComments(postId: string, commentFilter?: FilterQuery): Promise<PaginationResult<CommentEntity>> {
    return await this.commentRepository.findMany(postId, commentFilter);
  }
}
