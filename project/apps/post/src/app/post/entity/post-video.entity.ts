import { VideoPost } from '@project/libs/shared/app/types';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostVideoEntity extends BasePostEntity implements VideoPost, Entity<string, VideoPost> {
  public id?: string;
  public videoURL?: string;

  constructor (post: VideoPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO (): VideoPost {
    return {
      ...super.toPOJO(),
      videoURL: this.videoURL
    };
  }

  public populate(data: VideoPost): void {
    this.videoURL = data.videoURL;
  }

  static fromObject(data: VideoPost): PostVideoEntity {
    return new PostVideoEntity(data);
  }
}
