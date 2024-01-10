import { VideoPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostVideoEntity extends BasePostEntity implements VideoPost, Entity<string, VideoPost> {
  public id?: string;
  public videoURL?: string;

  constructor (post: VideoPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...super.toPOJO(),
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

  static fromObject(data: VideoPost): PostVideoEntity {
    return new PostVideoEntity(data);
  }
}
