import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {DEFAULT_PAGE_NUMBER} from '../comment.constant';
import { CommentFilter } from '@project/libs/shared/app/types';

export class FilterQuery implements CommentFilter {
  @ApiProperty({
    description: 'Page number',
    example: '2',
  })
  @IsOptional()
  @Transform(({value}) => +value || DEFAULT_PAGE_NUMBER)
  public page?: number = DEFAULT_PAGE_NUMBER;

}
