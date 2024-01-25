import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsMongoId } from 'class-validator';
import { PostValidationMessage, DEFAULT_PAGE_NUMBER, DEFAULT_SORT_BY_FIELD, DEFAULT_SORT_BY_ORDER } from '../post.constant';
import { PostFilter, SortByQuery, SortByOrder } from '@project/libs/shared/app/types';

export class SubscriptionFilterQuery implements PostFilter {
  @ApiProperty({
    description: 'The list of publishers user subscribed for',
    example: ['1234-5678-9012-3456', '1234-5678-1584-3456', '1234-3268-9012-3456']
  })
  @IsOptional()
  @IsMongoId({each: true, message: PostValidationMessage.AuthorId.InvalidFormat})
  public authorList?: string[];

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
  public sortByField?: SortByQuery = DEFAULT_SORT_BY_FIELD;

  @ApiProperty({
    description: 'SortBy order',
    example: 'desc'
  })
  @IsOptional()
  public sortByOrder?: SortByOrder = DEFAULT_SORT_BY_ORDER;
}

