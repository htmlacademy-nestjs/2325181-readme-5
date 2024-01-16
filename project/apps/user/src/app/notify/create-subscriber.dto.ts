import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SubscriberValidationMessage } from './subscriber.constant';

export class CreateSubscriberDto {
  @IsNotEmpty({message: SubscriberValidationMessage.EmailRequired})
  @IsEmail({}, {message: SubscriberValidationMessage.EmailInvalidFormat})
  public email: string;

  @IsNotEmpty({message: SubscriberValidationMessage.FirstnameRequired})
  @IsString({message: SubscriberValidationMessage.FirstnameInvalidFormat})
  public firstname: string;

  @IsNotEmpty({message: SubscriberValidationMessage.LastnameRequired})
  @IsString({message: SubscriberValidationMessage.LastnameInvalidFormat})
  public lastname: string;
}
