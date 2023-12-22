import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostLinkEntity } from '../entity/post-link.entity';

export class PostLinkRepository extends BaseMemoryRepository<PostLinkEntity> {
  public async findMany(): Promise<PostLinkEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
