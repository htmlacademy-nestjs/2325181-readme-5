import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateCitePostDto extends CreateBasePostDto {
  @ApiProperty({
    description: 'In case of cite type, the cite creator',
    example: 'William Shakespeare'
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.Creator.InvalidFormat})
  @Length(
    PostValidationParams.Creator.Length.Minimum,
    PostValidationParams.Creator.Length.Maximum,
    {message: PostValidationMessage.Creator.InvalidLength}
  )
  public creator: string;

  @ApiProperty({
    description: 'In case of cite type, the cite text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.Creator.InvalidFormat})
  @Length(
    PostValidationParams.CiteText.Length.Minimum,
    PostValidationParams.CiteText.Length.Maximum,
    {message: PostValidationMessage.Creator.InvalidLength}
  )
  public citeText: string

}
