export const PostType = {
  Video: 'video',
  Photo: 'photo',
  Link: 'link',
  Cite: 'cite',
  Text: 'text'
} as const;


export type PostTypeValues = typeof PostType[keyof typeof PostType];
