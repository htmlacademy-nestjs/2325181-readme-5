import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, IsUrl, Length } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';

export class CreateVideoPostDto {

  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags: string[];

  @ApiProperty({
    description: 'In case of video type, the video URL.',
    example: '/video/video1.mp4'
  })
  @IsUrl({},{message: PostValidationMessage.VideoURL.InvalidFormat})
  public videoURL?: string;

  @ApiProperty({
    description: 'In case of text or video type, the post title',
    example: ''
  })
  @IsString({message: PostValidationMessage.Title.InvalidFormat})
  @Length(
    PostValidationParams.Title.Length.Minimum,
    PostValidationParams.Title.Length.Maximum,
    {message: PostValidationMessage.Title.InvalidLength}
  )
  public title?: string;
}
