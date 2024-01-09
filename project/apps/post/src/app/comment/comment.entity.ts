import { Comment } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';


export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public postId: string;
  public text: string;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public toPOJO ():Comment {
    return {
      id: this.id,
      text: this.text,
      postId: this.postId
    };
  }

  public populate(data: Comment): void {
    this.text = data.text;
    this.postId = data.postId;
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
