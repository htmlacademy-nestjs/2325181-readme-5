import { IsEmail, IsNotEmpty } from 'class-validator';
import { SendNewPostsValidationMessage } from '../subscriber.constant';

export class UpdateSubscriptionDto {
  @IsNotEmpty({message: SendNewPostsValidationMessage.EmailRequired})
  @IsEmail({}, { message: SendNewPostsValidationMessage.EmailInvalidFormat })
  public email: string;

  @IsNotEmpty({message: SendNewPostsValidationMessage.EmailRequired})
  @IsEmail({}, { message: SendNewPostsValidationMessage.EmailInvalidFormat })
  public emailSubscribe: string;
}
