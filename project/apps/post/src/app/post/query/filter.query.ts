import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Length, Matches, IsMongoId, IsIn } from 'class-validator';
import { PostValidationMessage, PostValidationParams, DEFAULT_PAGE_NUMBER, DEFAULT_SORT_BY_FIELD } from '../post.constant';
import { PostTypeValues, PostType, PostFilter, SortByQuery } from '@project/libs/shared/app/types';

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
  @IsIn(Object.values(PostType), {message: PostValidationMessage.Type.InvalidFormat})
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

  @ApiProperty({
    description: 'Page number',
    example: '2',
  })
  @IsOptional()
  @Transform(({value}) => +value || DEFAULT_PAGE_NUMBER)
  public page?: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    description: 'SortBy field',
    example: 'comments'
  })
  @IsOptional()
  public sortBy?: SortByQuery = DEFAULT_SORT_BY_FIELD;
}

