import { CitePost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Entity } from '@project/libs/shared/core';

export class PostCiteEntity implements CitePost, Entity<string> {
  public id?: string;
  public creator?: string;
  public citeText?: string;

  constructor (post: CitePost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
      creator: this.creator,
      citeText: this.citeText,
    };
  }

  public populate(data: CitePost): void {
    this.creator = data.creator;
    this.citeText = data.citeText;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
