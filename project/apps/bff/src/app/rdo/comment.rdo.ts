import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @Expose()
  @ApiProperty({
    description: 'Comment unique ID',
    example: '1234-5678-9012-3456'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis egestas tortor sit amet iaculis.'
  })
  public text: string;

  @Expose()
  @ApiProperty({
    description:'Referred post unique ID',
    example: '1234-5678-9012-3456'
  })
  public postId: string;
}
