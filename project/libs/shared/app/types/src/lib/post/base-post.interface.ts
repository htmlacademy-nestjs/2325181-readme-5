import { PostTypeValues } from './post-type.type';
import { Entity, EntityIdType} from '@project/libs/shared/core'

export interface BasePost extends Entity<EntityIdType> {
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
}
