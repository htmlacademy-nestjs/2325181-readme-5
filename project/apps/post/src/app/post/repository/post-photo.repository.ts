import { BaseMemoryRepository } from '@project/libs/shared/core';
import { PostPhotoEntity } from '../entity/post-photo.entity';

export class PostPhotoRepository extends BaseMemoryRepository<PostPhotoEntity> {
  public async findMany(): Promise<PostPhotoEntity[]> {
    const entities = Array.from(this.baseMemoryEntities.values());
    return Promise.resolve(entities)
  }
}
