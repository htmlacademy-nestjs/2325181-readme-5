import { BaseMemoryRepository } from '@project/libs/shared/core';
import { BasePostEntity } from '../entity/base-post.entity';

export class PostRepository extends BaseMemoryRepository<BasePostEntity> {
  public async findMany(): Promise<BasePostEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
