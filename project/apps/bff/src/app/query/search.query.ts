import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PostValidationMessage } from '../app.constant';

export class SearchQuery {
  @ApiProperty({
    description: 'The title word to search.',
    example: 'some text',
    default: ''
  })
  @IsString({message: PostValidationMessage.Title.InvalidFormat})
  public title?: string;
}
