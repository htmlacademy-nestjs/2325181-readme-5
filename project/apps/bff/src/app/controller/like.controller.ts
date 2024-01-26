import { Body, Controller, Get, Req, Patch, Delete, Param, Query, Post, UseFilters, UseGuards, HttpCode, HttpStatus, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL, getAuthHeader } from '../app.config';
import { LikeRdo } from '../rdo';

@UseFilters(AxiosExceptionFilter)
@Controller('like')
export class LikeController {
  constructor (
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The like has been added.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/:postId')
  public async create(
    @Param('postId') postId: string,
    @Req() req: Request,
  ): Promise<LikeRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<LikeRdo>(`${ApplicationServiceURL.Like}/${postId}`, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === 403) {
        throw new ForbiddenException('Forbidden to add another like');
      }
      if (err.response.status === 401) {
        throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The like has been deleted.'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @Delete('/:postId')
  public async delete(
    @Param('postId') postId: string,
    @Req() req: Request,
  ): Promise<void> {
    try {
      await this.httpService.axiosRef.delete<LikeRdo>(`${ApplicationServiceURL.Like}/${postId}`, getAuthHeader(req));
    } catch (err) {
      if (err.response.status === 404) {
        throw new ForbiddenException('Not found likes to delete');
      }
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The likes count number provided.'
  })
  @Get('count/:postId')
  public async count(
    @Param('postId') postId: string,
    @Req() req: Request,
  ): Promise<number> {
    try {
      const {data} = await this.httpService.axiosRef.get<number>(`${ApplicationServiceURL.Like}/count/${postId}`, getAuthHeader(req));
      return data;
    } catch (err) {
      if (err.response.status === 404) {
        throw new ForbiddenException('Not possible to count likes');
      }
    }
  }

}
