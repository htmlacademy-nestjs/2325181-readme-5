import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
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
    description: 'Access token',
    example: 'user@user.local'
  })
  public accessToken: string;

}
