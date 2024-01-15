import { TextPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';
import { Entity } from '@project/libs/shared/core';

export class PostTextEntity extends BasePostEntity implements TextPost, Entity<string, TextPost> {
  public id?: string;
  public announce?: string;
  public title?: string;
  public text?: string;


  constructor (post: TextPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...super.toPOJO(),
      announce: this.announce,
      title: this.title,
      text: this.text
    }
  }

  public populate(data: TextPost): void {
    this.announce = data.announce;
    this.title = data.title;
    this.text = data.text;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }

  static fromObject(data: TextPost): PostTextEntity {
    return new PostTextEntity(data);
  }
}
