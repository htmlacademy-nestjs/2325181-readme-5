import { BaseMemoryRepository } from '@project/libs/shared/core';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
  public async findManyByPostId(postId: string): Promise<CommentEntity[] | []> {
    const entities = Array.from(this.baseMemoryEntities.values());
    const comments = entities.filter((entity) => entity.postId === postId);
    return Promise.resolve(comments);
  }

  public async deleteManyByPostId(postId: string): Promise<void> {
    const entitiesToDelete = await this.findManyByPostId(postId);
    if (entitiesToDelete.length) {
      entitiesToDelete.forEach((entity: CommentEntity) => {
        if (entity.postId === postId) {
          this.deleteById(entity.id)
        }
      })
    }
  }
}
