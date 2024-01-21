import { BasePost, Comment, Like, PostTypeValues } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
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



  constructor (data: BasePost) {
    this.id = data.id ?? undefined;
    this.type = data.type;
    this.isPublished = data.isPublished;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
    this.authorId = data.authorId;
    this.originAuthorId = data.originAuthorId;
    this.originPostId = data.originPostId;
    this.publishedAt = new Date();
    this.createdAt = new Date();
    this.comments = data.comments ?? [];
    this.likes = data.likes ?? [];
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

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }

  static fromObject(data: BasePost): BasePostEntity {
    return new BasePostEntity(data);
  }
}
