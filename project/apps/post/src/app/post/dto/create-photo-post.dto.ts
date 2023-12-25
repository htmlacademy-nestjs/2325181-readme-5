import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreatePhotoPostDto extends CreateBasePostDto {
  @ApiProperty({
    description: 'In case of photo type, the photo file',
    example: ''
  })
  @Matches(PostValidationParams.Photo.RegexURL, {message: PostValidationMessage.Photo.Invalidformat})
  public photo: string;
}
