import { VideoPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Entity } from '@project/libs/shared/core';

export class PostVideoEntity implements VideoPost, Entity<string> {
  public id?: string;
  public videoURL?: string;

  constructor (post: VideoPost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
      videoURL: this.videoURL
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
