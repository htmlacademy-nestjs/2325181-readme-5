import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostCiteEntity } from '../entity/post-cite.entity';

export class PostCiteRepository extends BaseMemoryRepository<PostCiteEntity> {
  public async findMany(): Promise<PostCiteEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
