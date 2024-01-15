import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsIn, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { PostType, PostTypeValues } from '@project/libs/shared/app/types';

export class CreateBasePostDto {
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsOptional()
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @Length(
    PostValidationParams.Tags.Length.Minimum,
    PostValidationParams.Tags.Length.Maximum,
    {each: true, message: PostValidationMessage.Tags.InvalidLength}
  )
  @Matches(PostValidationParams.Tags.RegExp, {message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags?: string[];

  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  @IsNotEmpty()
  @IsIn(Object.values(PostType), {message: PostValidationMessage.Type.InvalidFormat})
  public type: PostTypeValues;
}
