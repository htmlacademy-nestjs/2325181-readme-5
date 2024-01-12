import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { COMMENT_NOT_FOUND, POST_FOR_COMMENT_NOT_FOUND } from './comment.constant';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  public async createNewComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const {postId, text} = dto;
    const existPost = await this.postService.getPostEntity(postId);
    if (!existPost) {
      throw new NotFoundException(POST_FOR_COMMENT_NOT_FOUND);
    }
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
}
