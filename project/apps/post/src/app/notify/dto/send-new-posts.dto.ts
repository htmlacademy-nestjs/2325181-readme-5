import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { SendNewPostsValidationMessage } from '../notify-post.constant';
import { Post } from '@prisma/client';

export class SendNewPostsDto {
  @IsNotEmpty({message: SendNewPostsValidationMessage.EmailRequired})
  @IsEmail({}, { message: SendNewPostsValidationMessage.EmailInvalidFormat })
  public email: string;

  @IsNotEmpty({message: SendNewPostsValidationMessage.PostsRequired})
  @IsArray({message: SendNewPostsValidationMessage.PostsInvalidFormat})
  public posts: Post[];
}
