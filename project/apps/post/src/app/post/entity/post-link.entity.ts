import { LinkPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Entity } from '@project/libs/shared/core';

export class PostLinkEntity implements LinkPost, Entity<string> {
  public id?: string;
  public linkURL?: string;
  public linkDescription?: string;

  constructor (post: LinkPost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
      linkURL: this.linkURL,
      linkDescription: this.linkDescription,
    };
  }

  public populate(data: LinkPost): void {
    this.linkURL = data.linkURL;
    this.linkDescription = data.linkDescription;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
