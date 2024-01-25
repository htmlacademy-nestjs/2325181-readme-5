import { BasePost } from './post/base-post.interface'

export type SortByQuery = keyof Pick<BasePost, 'comments' | 'publishedAt' | 'likes'>

export type SortByOrder = 'desc' | 'asc';
