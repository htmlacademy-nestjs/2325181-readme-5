import { BasePost, Comment, Like, PostTypeValues } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';

export class BasePostEntity implements BasePost, Entity<string, BasePost> {
  public id?: string;
  public type: PostTypeValues;
  public isPublished: boolean;
  public isRepost: boolean;
  public tags: string[];
  public authorId: string;
  public originPostId: string;
  public originAuthorId: string;
  public publishedAt?: Date;
  public createdAt?: Date;
  public comments: Comment[];
  public likes: Like[];



  constructor (post: BasePost) {
    this.id = post.id ?? undefined;
    this.type = post.type;
    this.isPublished = post.isPublished;
    this.isRepost = post.isRepost;
    this.tags = post.tags;
    this.authorId = post.authorId;
    this.originAuthorId = post.originAuthorId;
    this.originPostId = post.originPostId;
    this.comments = post.comments ?? [];
    this.likes = post.likes ?? [];
    this.publishedAt = new Date();
    this.createdAt = new Date();
  }

  public toPOJO (): BasePost {
    return {
      id: this.id,
      type: this.type,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      tags: this.tags,
      authorId: this.authorId,
      originPostId: this.originPostId,
      originAuthorId: this.originAuthorId,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
      comments: this.comments,
      likes: this.likes,
    };
  }

  public populate(data: BasePost): void {
    this.id = data.id;
    this.type = data.type;
    this.isPublished = data.isPublished;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
    this.authorId = data.authorId;
    this.originAuthorId = data.originAuthorId;
    this.originPostId = data.originPostId;
    this.comments = data.comments;
    this.id = data.id;
    this.publishedAt = data.publishedAt;
    this.createdAt = data.createdAt;
    this.comments = data.comments;
    this.likes = data.likes;
  }

  static fromObject(data: BasePost): BasePostEntity {
    return new BasePostEntity(data);
  }
}
