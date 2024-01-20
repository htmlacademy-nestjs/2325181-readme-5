import { BasePost } from './post/base-post.interface'

export type SortByQuery = keyof Pick<BasePost, 'comments' | 'createdAt' | 'likes'>
