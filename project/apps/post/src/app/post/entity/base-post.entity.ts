import { BasePost, PostTypeValues } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';

export class BasePostEntity implements BasePost {
  public id?: string;
  public type: PostTypeValues;
  public isPublished: boolean;
  public isRepost: boolean;
  public tags: string[];
  public authorId: string;
  public originPostId: string;
  public originAuthorId: string;

  constructor (post: BasePost) {
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...this
    };
  }

  public populate(data: BasePost): void {
    this.type = data.type;
    this.isPublished = data.isPublished;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
    this.authorId = data.authorId;
    this.originAuthorId = data.originAuthorId;
    this.originPostId = data.originPostId;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
