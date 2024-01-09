import { BasePost } from './base-post.interface';

export interface LinkPost extends BasePost {
  linkURL?: string,
  linkDescription?: string
}
