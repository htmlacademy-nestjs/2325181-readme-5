import { PostWithText } from './post-with-text.interface';
import { PostWithTitle } from './post-with-title.interface';

export interface TextPost extends PostWithText, PostWithTitle {
  announce?: string,
}
