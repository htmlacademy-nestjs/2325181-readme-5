import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { CommentValidationMessage, CommentValidationParams } from '../comment.constant';


export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  @IsNotEmpty()
  @IsString({message: CommentValidationMessage.Text.InvalidFormat})
  @Length(
    CommentValidationParams.Text.Length.Minimal,
    CommentValidationParams.Text.Length.Maximal,
    {message: CommentValidationMessage.Text.InvalidLength}
  )
  public text: string;

  @ApiProperty({
    description:'Referred post unique ID',
    example: '1234-5678-9012-3456'
  })
  @IsNotEmpty()
  @IsUUID('all', {message: CommentValidationMessage.PostId.InvalidFormat})
  public postId: string
}
