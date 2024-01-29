import { Body, Controller, Get, Req, Delete, Param, Query, Post, UseFilters, UseGuards, HttpCode, HttpStatus, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL, getAuthHeader } from '../app.config';
import { CreateCommentDto} from '../dto';
import { CommentRdo} from '../rdo';
import { EntitiesWithPaginationRdo } from '@project/libs/shared/app/types';
import { CommentFilterQuery } from "../query";

@UseFilters(AxiosExceptionFilter)
@Controller('comment')
export class CommentController {
  constructor (
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been created.'
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateCommentDto,
    @Req() req: Request
  ): Promise<CommentRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<CommentRdo>(`${ApplicationServiceURL.Comment}`, dto, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been deleted.'
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  public async delete(
    @Param('commentId') commentId: string,
    @Req() req: Request
  ): Promise<void> {
    try {
      await this.httpService.axiosRef.delete<void>(`${ApplicationServiceURL.Comment}/${commentId}`, getAuthHeader(req));
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Comment not found');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comments list has been provided.'
  })
  @Get(':postId')
  public async index(
    @Param('postId') postId: string,
    @Query() commentFilter: CommentFilterQuery
  ): Promise<EntitiesWithPaginationRdo<CommentRdo>> {
    try {
      const { data } = await this.httpService.axiosRef
        .get<EntitiesWithPaginationRdo<CommentRdo>>(`${ApplicationServiceURL.Comment}/${postId}`,{
        params: commentFilter
      });
      return data
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('Posts not found');
      }
    }
  }

}
