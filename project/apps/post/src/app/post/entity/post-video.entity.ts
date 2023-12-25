import { VideoPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';

export class PostVideoEntity extends BasePostEntity implements VideoPost {
  public id?: string;
  public videoURL?: string;

  constructor (post: VideoPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...this,
    };
  }

  public populate(data: VideoPost): void {
    this.videoURL = data.videoURL;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
