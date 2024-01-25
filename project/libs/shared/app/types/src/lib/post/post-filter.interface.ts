import { PostTypeValues } from './post-type.type';

export interface PostFilter {
  authorId?: string;
  type?: PostTypeValues;
  tag?: string;
  authorList?: string[]
}
