import { Like } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public postId: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor (like: Like) {
    this.populate(like);
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  public populate(data: Like): void {
    this.id = data.id;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static fromObject (data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}
