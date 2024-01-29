import { Expose, Transform} from 'class-transformer';
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
    description: 'The list of authors user subscribed for',
    example: ['mail1@domain.com', 'mail2@domain.com', 'mail3@domain.com'],
    default: []
  })
  public subscribedFor: number;

  @Expose()
  @ApiProperty({
    description: 'The publications count',
    example: 25,
    default: '',
  })
  public publicationsCount: number;

  @Expose()
  @ApiProperty({
    description: 'The user subscribers count',
    example: 14,
    default: '',
  })
  public subscribersCount: number;
}
