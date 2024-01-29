import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty} from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../app.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateTextPostDto extends CreateBasePostDto{
  @ApiProperty({
    description: 'In case of text type, the announce text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.Announce.InvalidFormat})
  @Length(
    PostValidationParams.Announce.Length.Minimum,
    PostValidationParams.Announce.Length.Maximum,
    {message: PostValidationMessage.Announce.InvalidLength}
  )
  public announce: string;

  @ApiProperty({
    description: 'In case of text type, the post text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.Text.InvalidFormat})
  @Length(
    PostValidationParams.Text.Length.Minimum,
    PostValidationParams.Text.Length.Maximum,
    {message: PostValidationMessage.Text.InvalidLength}
  )
  public text: string

  @ApiProperty({
    description: 'In case of text or video type, the post title',
    example: ''
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.Title.InvalidFormat})
  @Length(
    PostValidationParams.Title.Length.Minimum,
    PostValidationParams.Title.Length.Maximum,
    {message: PostValidationMessage.Title.InvalidLength}
  )
  public title: string;
}
