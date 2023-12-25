import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostContentEntity } from '../entity/post-content.entity';

export class PostRepository extends BaseMemoryRepository<PostContentEntity> {
  public async findMany(): Promise<PostContentEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
