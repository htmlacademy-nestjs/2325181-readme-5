import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { SendNewPostsValidationMessage } from '../notify-post.constant';
import { PostContent } from '@project/libs/shared/app/types';

export class SendNewPostsDto {
  @IsNotEmpty({message: SendNewPostsValidationMessage.EmailRequired})
  @IsEmail({}, { message: SendNewPostsValidationMessage.EmailInvalidFormat })
  public email: string;

  @IsNotEmpty({message: SendNewPostsValidationMessage.PostsRequired})
  @IsArray({message: SendNewPostsValidationMessage.PostsInvalidFormat})
  public posts: PostContent[];
}
