import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Get, Param, HttpStatus, Delete } from '@nestjs/common';
import { fillDTO } from '@project/libs/shared/helpers';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentEntity } from './comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been created.'
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto): Promise<CommentRdo> {
    const newComment = await this.commentService.createNewComment(dto);
    return fillDTO(CommentRdo, newComment.toPOJO())
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been deleted.'
  })
  @Delete(':commentId')
  public async delete(@Param('commentId') commentId: string): Promise<void> {
    this.commentService.deleteComment(commentId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comments list has been provided.'
  })
  @Get(':postId')
  public async index(@Param('postId') postId: string): Promise<CommentRdo[] | []> {
    const commentList = await this.commentService.listCommentByPostId(postId);
    return fillDTO(CommentRdo, commentList.map((comment: CommentEntity) => comment.toPOJO()))
  }

}
