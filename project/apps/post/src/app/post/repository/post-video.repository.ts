import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostVideoEntity } from '../entity/post-video.entity';


export class PostVideoRepository extends BaseMemoryRepository<PostVideoEntity> {
  public async findMany(): Promise<PostVideoEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
