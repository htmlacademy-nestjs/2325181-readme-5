import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CommentValidationMessage, CommentValidationParams } from '../comment.constant';

{ ApiProperty}

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
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
  public postId: string
}
