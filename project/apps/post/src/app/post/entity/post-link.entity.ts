import { LinkPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostLinkEntity extends BasePostEntity implements LinkPost, Entity<string, LinkPost> {
  public id?: string;
  public linkURL?: string;
  public linkDescription?: string;

  constructor (post: LinkPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO (): LinkPost {
    return {
      ...super.toPOJO(),
      linkDescription: this.linkDescription,
      linkURL: this.linkURL
    };
  }

  public populate(data: LinkPost): void {
    this.linkURL = data.linkURL;
    this.linkDescription = data.linkDescription;
  }

  static fromObject(data: LinkPost): PostLinkEntity {
    return new PostLinkEntity(data);
  }
}
