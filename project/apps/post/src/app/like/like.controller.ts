import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { HttpStatus, Param, Controller, Post, Req, Delete } from '@nestjs/common';
import { TokenPayload } from '@project/libs/shared/app/types';
import { fillDTO } from '@project/libs/shared/helpers';
import { LikeRdo } from './rdo/like.rdo';

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
  @Post('/:postId')
  public async create(@Param('postId') postId: string, @Req() { sub }: TokenPayload): Promise<LikeRdo> {
    const newLike = await this.likeService.addLike({postId, userId: sub});
    return fillDTO(LikeRdo, newLike.toPOJO())
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The like has been deleted.'
  })
  @Delete('/:postId')
  public async delete(@Param('postId') postId: string, @Req() { sub }: TokenPayload): Promise<void> {
    await this.likeService.deleteLike(sub, postId);
  }
}
