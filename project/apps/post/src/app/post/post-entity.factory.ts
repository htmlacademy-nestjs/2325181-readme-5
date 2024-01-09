import { PostType } from '@project/libs/shared/app/types';
import { PostCiteEntity, PostLinkEntity, PostPhotoEntity, PostTextEntity, PostVideoEntity } from './entity/index';

export const PostEntityAdapter = {
  [PostType.Cite]: PostCiteEntity,
  [PostType.Video]: PostVideoEntity,
  [PostType.Photo]: PostPhotoEntity,
  [PostType.Text]: PostTextEntity,
  [PostType.Link]: PostLinkEntity,
}
