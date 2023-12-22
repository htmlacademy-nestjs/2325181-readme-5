import { TextPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Entity } from '@project/libs/shared/core';

export class PostTextEntity implements TextPost, Entity<string> {
  public id?: string;
  public announce?: string;
  public title?: string;
  public text?: string;


  constructor (post: TextPost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
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
}
