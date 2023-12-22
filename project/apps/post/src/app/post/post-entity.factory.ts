import { CitePost, LinkPost, PhotoPost, PostContent, PostType, PostTypeValues, TextPost, VideoPost } from '@project/libs/shared/app/types';
import { PostCiteEntity, PostLinkEntity, PostPhotoEntity, PostTextEntity, PostVideoEntity } from './entity/index';


export function PostEntityFactory (type: PostTypeValues, postContent: PostContent):[PostCiteEntity | PostLinkEntity | PostPhotoEntity | PostTextEntity | PostVideoEntity, string] {
  switch(type) {
    case (PostType.Video):
      return [new PostVideoEntity(postContent as VideoPost), 'postVideoRepository'];
    case (PostType.Photo):
      return [new PostPhotoEntity(postContent as PhotoPost), 'postPhotoRepository'];
      case (PostType.Cite):
        return [new PostCiteEntity(postContent as CitePost), 'postCiteRepository'];
    case (PostType.Link):
      return [new PostLinkEntity(postContent as LinkPost), 'postLinkRepository'];
    case (PostType.Text):
      return [new PostTextEntity(postContent as TextPost), 'postTextRepository'];
    default:
      throw new Error('Unknown post type');
  }
}
