import { Comment } from '../comment.interface';
import { PostTypeValues } from './post-type.type';

export interface BasePost {
  id?: string;
  type: PostTypeValues;
  tags: string[];
  authorId: string;
  isPublished: boolean;
  isRepost: boolean;
  originPostId: string;
  originAuthorId: string;
  createdAt?: Date;
  publishedAt?: Date;
  comments: Comment[];
}
