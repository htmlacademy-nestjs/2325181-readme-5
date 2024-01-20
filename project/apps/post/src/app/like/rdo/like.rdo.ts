import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @Expose()
  @ApiProperty({
    description: 'Like unique ID',
    example: '1234-5678-9012-3456'
  })

  public id?: string;

  @Expose()
  @ApiProperty({
    description: 'Referred post unique ID',
    example: '1234-5678-9012-3456'
  })
  public postId: string;

  @Expose()
  @ApiProperty({
    description: 'Referred user unique ID',
    example: '1234-5678-9012-3456'
  })
  public userId: string;
}
