import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostEntity } from './post.entity';

export class PostRepository extends BaseMemoryRepository<PostEntity> {
  public async findMany(): Promise<PostEntity[] | []> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }

}
