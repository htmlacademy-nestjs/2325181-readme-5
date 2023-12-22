import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';

export class CreateCitePostDto {
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags: string[];

  @ApiProperty({
    description: 'In case of cite type, the cite creator',
    example: 'William Shakespeare'
  })
  @IsString({message: PostValidationMessage.Creator.InvalidFormat})
  @Length(
    PostValidationParams.Creator.Length.Minimum,
    PostValidationParams.Creator.Length.Maximum,
    {message: PostValidationMessage.Creator.InvalidLength}
  )
  public creator?: string;

  @ApiProperty({
    description: 'In case of cite type, the cite text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsString({message: PostValidationMessage.Creator.InvalidFormat})
  @Length(
    PostValidationParams.CiteText.Length.Minimum,
    PostValidationParams.CiteText.Length.Maximum,
    {message: PostValidationMessage.Creator.InvalidLength}
  )
  public citeText?: string

}
