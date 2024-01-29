import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { HttpStatus, Param, Controller, Post, Req, Delete, Get, UseGuards } from '@nestjs/common';
import { RequestWithTokenPayload, TokenPayload } from '@project/libs/shared/app/types';
import { fillDTO } from '@project/libs/shared/helpers';
import { LikeRdo } from './rdo/like.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor (
    private readonly likeService: LikeService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The like has been added.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/:postId')
  public async create(
    @Param('postId') postId: string,
    @Req() {user: { sub }}: RequestWithTokenPayload
  ): Promise<LikeRdo> {
    const newLike = await this.likeService.addLike({postId, userId: sub});
    return fillDTO(LikeRdo, newLike.toPOJO())
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The like has been deleted.'
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/:postId')
  public async delete(@Param('postId') postId: string, @Req() { sub }: TokenPayload): Promise<void> {
    await this.likeService.deleteLike({postId, userId: sub});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The likes count number provided.'
  })
  @Get('count/:postId')
  public async count(@Param('postId') postId: string): Promise<number> {
    return await this.likeService.countLikes(postId);
  }

}
