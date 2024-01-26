import { Expose} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: 'User unique ID',
    example: '1234-5678-9012-3456'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.com'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'Alex'
  })
  public firstname: string;

  @Expose()
  @ApiProperty({
    description: 'User last name',
    example: 'Bochkin'
  })
  public lastname: string;

  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'User registration date',
    example: '2024-01-24 13:59:34.849'
  })
  public createdAt: Date

  @Expose()
  @ApiProperty({
    description: 'The list of publishers user subscribed for',
    example: ['1234-5678-9012-3456', '1234-5678-1584-3456', '1234-3268-9012-3456']
  })
  public subscribedFor: string[];
}
