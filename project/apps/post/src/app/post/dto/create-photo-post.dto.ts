import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, Matches } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags: string[];

  @ApiProperty({
    description: 'In case of photo type, the photo file',
    example: ''
  })
  @Matches(PostValidationParams.Photo.RegexURL, {message: PostValidationMessage.Photo.Invalidformat})
  public photo?: string;
}
