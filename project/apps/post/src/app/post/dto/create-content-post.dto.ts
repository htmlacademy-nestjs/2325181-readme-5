import { CreateCitePostDto } from './create-cite-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';

export type CreateContentPostDtoType = CreateCitePostDto | CreatePhotoPostDto | CreateVideoPostDto | CreateTextPostDto | CreateLinkPostDto;

