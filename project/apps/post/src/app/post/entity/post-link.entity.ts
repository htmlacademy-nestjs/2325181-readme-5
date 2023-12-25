import { LinkPost } from '@project/libs/shared/app/types';
import { UpdatePostDto } from '../dto/update-post.dto';
import { BasePostEntity } from './base-post.entity';

export class PostLinkEntity extends BasePostEntity implements LinkPost {
  public id?: string;
  public linkURL?: string;
  public linkDescription?: string;

  constructor (post: LinkPost) {
    super(post);
    this.populate(post);
  }

  public toPOJO () {
    return {
      ...super.toPOJO(),
      linkDescription: this.linkDescription,
      linkURL: this.linkURL
    };
  }

  public populate(data: LinkPost): void {
    this.linkURL = data.linkURL;
    this.linkDescription = data.linkDescription;
  }

  public update(data: UpdatePostDto): void {
    for (let key in data) {
      this[key] = data[key];
    }
  }
}
