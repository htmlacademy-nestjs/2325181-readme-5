import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { PostService } from '../post/post.service';
import { AddDeleteLikeDto } from './dto/add-delete-like.dto';
import { LikeEntity } from './like.entity';
import { NotFoundException } from '@nestjs/common';
import { LIKE_NOT_FOUND, USER_UNAUTHORIZED, USER_FORBIDDEN } from './like.constant';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService,
  ) {}

  public async addLike (dto: AddDeleteLikeDto): Promise<LikeEntity> {
    const {isPublished} = await this.postService.getPostEntity(dto.postId);
    if (!isPublished) {
      throw new ForbiddenException(USER_FORBIDDEN);
    }
    if(await this.findLike(dto)) {
      throw new UnauthorizedException(USER_UNAUTHORIZED);
    }
    const newLike = new LikeEntity(dto);
    return await this.likeRepository.save(newLike);
  }

  public async findLike(dto: AddDeleteLikeDto):Promise<LikeEntity> {
    return await this.likeRepository.findByUserIdPostId(dto);
  }

  public async deleteLike (dto: AddDeleteLikeDto): Promise<void> {
    const existLike = await this.findLike(dto)
    if (!existLike) {
      throw new NotFoundException(LIKE_NOT_FOUND);
    }
    return this.likeRepository.deleteById(existLike.id);
  }

  public async countLikes (postId: string): Promise<number> {
    return await this.likeRepository.countManyByPostId(postId);
  }
}
