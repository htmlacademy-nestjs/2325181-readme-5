import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, IsUrl, Length, Matches, MaxLength, IsBoolean} from 'class-validator';
import { PostType, PostValidationMessage, PostValidationParams } from '../post.constant';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post type: video, text, photo, cite, link',
    example: 'video'
  })
  @IsOptional()
  @IsEnum(Object.values(PostType), {message: PostValidationMessage.Type.InvalidFormat})
  public type?: string;

  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsOptional()
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags?: string[];

  @ApiProperty({
    description: 'In case of photo type, the photo file',
    example: ''
  })
  @IsOptional()
  @Matches(PostValidationParams.Photo.RegexURL, {message: PostValidationMessage.Photo.Invalidformat})
  public photo?: string;

  @ApiProperty({
    description: 'In case of cite type, the cite creator',
    example: 'William Shakespeare'
  })
  @IsOptional()
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
  @IsOptional()
  @IsString({message: PostValidationMessage.Creator.InvalidFormat})
  @Length(
    PostValidationParams.CiteText.Length.Minimum,
    PostValidationParams.CiteText.Length.Maximum,
    {message: PostValidationMessage.Creator.InvalidLength}
  )
  public citeText?: string

  @ApiProperty({
    description: 'In case of link type, the link URL',
    example: '/blog.com/file/post1.html'
  })
  @IsOptional()
  @IsUrl({},{message: PostValidationMessage.LinkURL.InvalidFormat})
  public linkURL?: string;

  @ApiProperty({
    description: 'In case of link type, the link description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsOptional()
  @IsString({message: PostValidationMessage.LinkDescription.InvalidFormat})
  @MaxLength(
    PostValidationParams.LinkDescription.MaximumLength,
    {message: PostValidationMessage.LinkDescription.InvalidLength}
  )
  public linkDescription?: string

  @ApiProperty({
    description: 'In case of text type, the announce text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsOptional()
  @IsString({message: PostValidationMessage.Announce.InvalidFormat})
  @Length(
    PostValidationParams.Announce.Length.Minimum,
    PostValidationParams.Announce.Length.Maximum,
    {message: PostValidationMessage.Announce.InvalidLength}
  )
  public announce?: string;

  @ApiProperty({
    description: 'In case of text type, the post text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsOptional()
  @IsString({message: PostValidationMessage.Text.InvalidFormat})
  @Length(
    PostValidationParams.Text.Length.Minimum,
    PostValidationParams.Text.Length.Maximum,
    {message: PostValidationMessage.Text.InvalidLength}
  )
  public text?: string

  @ApiProperty({
    description: 'In case of video type, the video URL.',
    example: '/video/video1.mp4'
  })
  @IsOptional()
  @IsUrl({},{message: PostValidationMessage.VideoURL.InvalidFormat})
  public videoURL?: string;

  @ApiProperty({
    description: 'In case of text or video type, the post title',
    example: ''
  })
  @IsOptional()
  @IsString({message: PostValidationMessage.Title.InvalidFormat})
  @Length(
    PostValidationParams.Title.Length.Minimum,
    PostValidationParams.Title.Length.Maximum,
    {message: PostValidationMessage.Title.InvalidLength}
  )
  public title?: string;
}
