import { ForbiddenException, Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { PostService } from '../post/post.service';
import { AddLikeDto } from './dto/add-like.dto';
import { LikeEntity } from './like.entity';
import { NotFoundException } from '@nestjs/common';
import { LIKE_NOT_FOUND, POST_FOR_LIKE_NOT_FOUND } from './like.constant';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService,
  ) {}

  public async addLike (dto: AddLikeDto): Promise<LikeEntity> {
    const {postId, userId} = dto;
    const existPost = await this.postService.getPostEntity(postId);
    if (!existPost) {
      throw new NotFoundException(POST_FOR_LIKE_NOT_FOUND, LIKE_NOT_FOUND);
    }
    if (!existPost.isPublished) {
      throw new ForbiddenException
    }
    const likeDraft = {
      userId,
      postId
    }
    const newLike = new LikeEntity(likeDraft);
    return await this.likeRepository.save(newLike);
  }

  public async findlike(userId: string, postId: string):Promise<LikeEntity> {
    const existLike = await this.likeRepository.findByUserIdPostId(userId, postId);
    if (!existLike) {
      throw new NotFoundException(LIKE_NOT_FOUND);
    }
    return existLike;
  }

  public async deleteLike (userId: string, postId: string): Promise<void> {
    const {id: likeId} = await this.findlike(userId, postId)
    return this.likeRepository.deleteById(likeId);
  }

  public async countLikes (postId: string): Promise<number> {
    return await this.likeRepository.countManyByPostId(postId);
  }
}
