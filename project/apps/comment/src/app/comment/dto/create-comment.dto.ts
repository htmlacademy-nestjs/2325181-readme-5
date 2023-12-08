import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CommentValidationMessage, CommentValidationParams } from '../comment.constant';

{ ApiProperty}

export class CreateCommentDto {
  @ApiProperty({
    description:'',
    example:''
  })
  @IsString({message: CommentValidationMessage.Text.InvalidFormat})
  @Length(
    CommentValidationParams.Text.Length.Minimal,
    CommentValidationParams.Text.Length.Maximal,
    {message: CommentValidationMessage.Text.InvalidLength}
  )
  public text: string;
  @ApiProperty({
    description:'',
    example:''
  })

  public postId: string
}
