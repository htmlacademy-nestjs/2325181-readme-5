import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, IsUrl, Length, Matches, MaxLength} from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { PostType, PostTypeValues } from '@project/libs/shared/app/types';

export class CreateBasePostDto {
  @ApiProperty({
    description: 'Post tags, comma separated',
    example: 'travel, Paris, cat'
  })
  @IsArray({message: PostValidationMessage.Tags.InvalidFormat})
  @IsString({each: true, message: PostValidationMessage.Tags.InvalidFormat})
  @ArrayMaxSize(PostValidationParams.Tags.MaximumCount, {message: PostValidationMessage.Tags.MaxSize})
  public tags: string[];

  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  @IsEnum(Object.values(PostType), {message: PostValidationMessage.Type.InvalidFormat})
  public type: PostTypeValues;
}
