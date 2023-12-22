import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostTextEntity } from '../entity/post-text.entity';


export class PostTextRepository extends BaseMemoryRepository<PostTextEntity> {
  public async findMany(): Promise<PostTextEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
