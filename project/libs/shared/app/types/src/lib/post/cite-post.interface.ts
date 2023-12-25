import { BasePost } from './base-post.interface';
import { PostWithText } from './post-with-text.interface';

export interface CitePost extends PostWithText, BasePost{
  creator?: string,
  citeText?: string,
}
