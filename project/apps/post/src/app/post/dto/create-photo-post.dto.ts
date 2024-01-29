import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreatePhotoPostDto extends CreateBasePostDto {
  @ApiProperty({
    description: 'In case of photo type, the photo file',
    example: ''
  })
  @IsNotEmpty()
  @Matches(PostValidationParams.Photo.RegexURL, {message: PostValidationMessage.Photo.InvalidFormat})
  public photo: string;
}
