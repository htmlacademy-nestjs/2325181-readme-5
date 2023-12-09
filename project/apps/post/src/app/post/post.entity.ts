import { Post } from '@project/libs/shared/app/types';

export class PostEntity implements Post {
  public id?: string;
  public type: string;
  public isPublished: boolean;
  public isRepost: boolean;
  public tags: string[];
  public authorId: string;
  public likesCount: number;
  public commentsCount: number;
  public photo?: string;
  public creator?: string;
  public linkURL?: string;
  public announce?: string;
  public videoURL?: string;
  public title?: string;
  public text?: string

  constructor (post: Post) {

  }

  public toPOJO () {
    return {
      id: this.id,
      type: this.type,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      tag: this.tags,
      authorId: this.authorId,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      photo: this.photo,
      creator: this.creator,
      linkURL: this.linkURL,
      announce: this.announce,
      videoURL: this.videoURL,
      title: this.title,
      text: this.text
    };
  }

  public populate(data: Post): void {
    this.type = data.type;
    this.isPublished = data.isPublished;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
    this.authorId = data.authorId;
    this.likesCount = data.likesCount;
    this.commentsCount = data.commentsCount;
    this.photo = data.photo;
    this.creator = data.creator;
    this.linkURL = data.linkURL;
    this.announce = data.announce;
    this.videoURL = data.videoURL;
    this.title = data.title;
    this.text = data.text;
  }

}
