import { PostType, PostContent } from '@project/libs/shared/app/types';
import { PostCiteEntity, PostLinkEntity, PostPhotoEntity, PostTextEntity, PostVideoEntity } from './entity/index';
import { PostContentEntity } from './entity/post-content.entity';

export const PostEntityAdapter = {
  [PostType.Cite]: PostCiteEntity,
  [PostType.Video]: PostVideoEntity,
  [PostType.Photo]: PostPhotoEntity,
  [PostType.Text]: PostTextEntity,
  [PostType.Link]: PostLinkEntity,
}

export function PostEntityFactory (post: PostContent): PostContentEntity {
  return new PostEntityAdapter[post.type](post);
}
