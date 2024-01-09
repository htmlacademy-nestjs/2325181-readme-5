import { BasePost } from './base-post.interface';
import { PostWithTitle } from './post-with-title.interface';

export interface VideoPost extends PostWithTitle, BasePost {
  videoURL?: string
}
