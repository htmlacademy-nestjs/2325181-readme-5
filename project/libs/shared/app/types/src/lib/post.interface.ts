import {VideoPost, PhotoPost, TextPost, CitePost, LinkPost, PostWithText, PostWithTitle, Repost} from '@project/libs/shared/app/types';

export interface Post extends VideoPost, PhotoPost, TextPost, CitePost, LinkPost, PostWithText, PostWithTitle, Repost {
  id?: string,
  type: string,
  isPublished: boolean,
  isRepost: boolean,
  tags: string[],
  authorId: string,
}
