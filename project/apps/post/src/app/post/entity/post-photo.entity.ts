import { PhotoPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Entity } from '@project/libs/shared/core';

export class PostPhotoEntity implements PhotoPost, Entity<string> {
  public id?: string;
  public photo?: string;

  constructor (post: PhotoPost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
      photo: this.photo,
    };
  }

  public populate(data: PhotoPost): void {
    this.photo = data.photo;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
