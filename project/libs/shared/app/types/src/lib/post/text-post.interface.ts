import { BasePost } from './base-post.interface';
import { PostWithText } from './post-with-text.interface';
import { PostWithTitle } from './post-with-title.interface';

export interface TextPost extends PostWithText, PostWithTitle, BasePost {
  announce?: string,
}
