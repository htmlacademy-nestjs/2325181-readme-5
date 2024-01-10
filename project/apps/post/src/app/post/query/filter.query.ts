import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, Length, Matches, IsMongoId } from 'class-validator';
import { PostValidationMessage, PostValidationParams } from '../post.constant';
import { PostTypeValues, PostType, PostFilter } from '@project/libs/shared/app/types';

export class FilterQuery implements PostFilter {
  @ApiProperty({
    description: 'The id of posts author',
    example: '1233-5784-3434-3434',
  })
  @IsOptional()
  @IsMongoId({message: PostValidationMessage.AuthorId.InvalidFormat})
  public authorId?: string;

  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  @IsOptional()
  @IsEnum(Object.values(PostType), {message: PostValidationMessage.Type.InvalidFormat})
  public type?: PostTypeValues;

  @ApiProperty({
    description: 'Post tag',
    example: 'travel'
  })
  @IsOptional()
  @Length(
    PostValidationParams.Tags.Length.Minimum,
    PostValidationParams.Tags.Length.Maximum,
    {message: PostValidationMessage.Tags.InvalidLength}
  )
  @Matches(PostValidationParams.Tags.RegExp, {message: PostValidationMessage.Tags.InvalidFormat})
  public tag?: string;
}

