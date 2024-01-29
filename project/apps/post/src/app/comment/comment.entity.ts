import { Comment } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';


export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public postId: string;
  public text: string;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public toPOJO () {
    return {
      id: this.id,
      text: this.text,
      postId: this.postId,
      createdAt:this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId
    };
  }

  public populate(data: Comment): void {
    this.text = data.text;
    this.postId = data.postId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.userId = data.userId;
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
