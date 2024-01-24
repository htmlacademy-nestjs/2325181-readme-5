import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Get, Param, HttpStatus, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { fillDTO } from '@project/libs/shared/helpers';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { FilterQuery } from './query/filter.query';
import { EntitiesWithPaginationRdo, PaginationResult, Comment, RequestWithTokenPayload } from '@project/libs/shared/app/types';
import { CheckAuthGuard } from '../guards/check-auth.guard';


@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been created.'
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async create(@Body() dto: CreateCommentDto, @Req() { user }: RequestWithTokenPayload): Promise<CommentRdo> {
    const newComment = await this.commentService.createNewComment(dto, user.sub);
    return fillDTO(CommentRdo, newComment.toPOJO())
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been deleted.'
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':commentId')
  public async delete(@Param('commentId') commentId: string, @Req() { user }: RequestWithTokenPayload): Promise<void> {
    await this.commentService.deleteComment(commentId, user.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comments list has been provided.'
  })
  @Get(':postId')
  public async index(
    @Param('postId') postId: string,
    @Query() commentFilter: FilterQuery
  ): Promise<EntitiesWithPaginationRdo<CommentRdo>> {
    const commentsWithPagination = await this.commentService.listComments(postId, commentFilter);
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) => comment.toPOJO())
    }
    return fillDTO<EntitiesWithPaginationRdo<CommentRdo>, PaginationResult<Comment>>(EntitiesWithPaginationRdo<CommentRdo>, result)
  }
}
