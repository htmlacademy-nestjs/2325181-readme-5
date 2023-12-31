import { PhotoPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';

export class PostPhotoEntity extends BasePostEntity implements PhotoPost {
  public id?: string;
  public photo?: string;

  constructor (post: PhotoPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...super.toPOJO(),
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
