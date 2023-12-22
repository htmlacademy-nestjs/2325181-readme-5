export interface BasePost{
  id?: string,
  type: string,
  isPublished: boolean,
  isRepost: boolean,
  tags: string[],
  authorId: string,
  contentId: string,
  originPostId: string,
  originAuthorId: string,
}
