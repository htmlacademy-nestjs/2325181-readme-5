import { Comment } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core'

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public postId: string;
  public text: string;


  constructor(comment: Comment) {
    this.populate(comment);
  }

  public toPOJO () {
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


}
