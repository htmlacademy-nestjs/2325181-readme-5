import { Injectable } from '@nestjs/common';
import { Like } from '@project/libs/shared/app/types';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { PrismaClientService } from '@project/libs/shared/post/models';
import { LikeEntity } from './like.entity';
import { AddDeleteLikeDto } from './dto/add-delete-like.dto';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor (
    protected readonly client: PrismaClientService
  ) {
    super(client, LikeEntity.fromObject)
  }

  public async save(entity: LikeEntity): Promise<LikeEntity> {
    const likeDraft = await this.client.like.create({
      data: {...entity.toPOJO()}
    });
    entity.id = likeDraft.id;
    return entity;
  }

  public async findByUserIdPostId({userId, postId}: AddDeleteLikeDto): Promise<LikeEntity> {
    const foundLike = await this.client.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    return this.createEntityFromDocument(foundLike);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {id}
    });
  }

  public async countManyByPostId(postId: string): Promise<number> {
    return await this.client.like.count({
      where: {postId},
    });
  }
}
