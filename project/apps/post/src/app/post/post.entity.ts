import { Post } from '@project/libs/shared/app/types';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostEntity implements Post {
  public id?: string;
  public type: string;
  public isPublished: boolean;
  public isRepost: boolean;
  public tags: string[];
  public authorId: string;
  public photo?: string;
  public creator?: string;
  public linkURL?: string;
  public announce?: string;
  public videoURL?: string;
  public title?: string;
  public text?: string;
  public linkDescription?: string;
  public citeText?: string;
  public originAuthorId?: string;
  public originPostId?: string;

  constructor (post: Post) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      id: this.id,
      type: this.type,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      tag: this.tags,
      authorId: this.authorId,
      photo: this.photo,
      creator: this.creator,
      linkURL: this.linkURL,
      announce: this.announce,
      videoURL: this.videoURL,
      title: this.title,
      text: this.text,
      linkDescription: this.linkDescription,
      citeText: this.citeText,
      originAuthorId: this.originAuthorId,
      originPostId: this.originPostId,
    };
  }

  public populate(data: Post): void {
    this.type = data.type;
    this.isPublished = data.isPublished;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
    this.authorId = data.authorId;
    this.photo = data.photo;
    this.creator = data.creator;
    this.linkURL = data.linkURL;
    this.announce = data.announce;
    this.videoURL = data.videoURL;
    this.title = data.title;
    this.text = data.text;
    this.linkDescription = data.linkDescription;
    this.citeText = data.citeText;
    this.originAuthorId = data.originAuthorId;
    this.originPostId = data.originPostId;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
