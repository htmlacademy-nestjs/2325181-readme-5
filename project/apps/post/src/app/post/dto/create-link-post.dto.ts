import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, IsUrl, MaxLength} from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags: string[];

  @ApiProperty({
    description: 'In case of link type, the link URL',
    example: '/blog.com/file/post1.html'
  })
  @IsUrl({},{message: PostValidationMessage.LinkURL.InvalidFormat})
  public linkURL?: string;

  @ApiProperty({
    description: 'In case of link type, the link description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsString({message: PostValidationMessage.LinkDescription.InvalidFormat})
  @MaxLength(
    PostValidationParams.LinkDescription.MaximumLength,
    {message: PostValidationMessage.LinkDescription.InvalidLength}
  )
  public linkDescription?: string
}
