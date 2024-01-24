import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, IsNotEmpty} from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../app.constant';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateLinkPostDto extends CreateBasePostDto {
  @ApiProperty({
    description: 'In case of link type, the link URL',
    example: '/blog.com/file/post1.html'
  })
  @IsNotEmpty()
  @IsUrl({},{message: PostValidationMessage.LinkURL.InvalidFormat})
  public linkURL: string;

  @ApiProperty({
    description: 'In case of link type, the link description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsNotEmpty()
  @IsString({message: PostValidationMessage.LinkDescription.InvalidFormat})
  @MaxLength(
    PostValidationParams.LinkDescription.MaximumLength,
    {message: PostValidationMessage.LinkDescription.InvalidLength}
  )
  public linkDescription: string
}
