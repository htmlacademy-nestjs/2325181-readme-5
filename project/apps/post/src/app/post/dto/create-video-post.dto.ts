import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto {
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
