import { PhotoPost } from '@project/libs/shared/app/types';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostPhotoEntity extends BasePostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public id?: string;
  public photo?: string;

  constructor (post: PhotoPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO (): PhotoPost {
    return {
      ...super.toPOJO(),
      photo: this.photo,
    };
  }

  public populate(data: PhotoPost): void {
    this.photo = data.photo;
  }

  static fromObject(data: PhotoPost): PostPhotoEntity {
    return new PostPhotoEntity(data);
  }
}
