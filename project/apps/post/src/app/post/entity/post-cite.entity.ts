import { CitePost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostCiteEntity extends BasePostEntity implements CitePost, Entity<string> {
  public id?: string;
  public creator?: string;
  public citeText?: string;

  constructor (post: CitePost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...this
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
