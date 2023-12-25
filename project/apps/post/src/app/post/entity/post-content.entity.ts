import { PostCiteEntity, PostLinkEntity, PostPhotoEntity, PostTextEntity, PostVideoEntity } from './index';

export type PostContentEntity = PostCiteEntity | PostVideoEntity | PostPhotoEntity | PostLinkEntity | PostTextEntity;
