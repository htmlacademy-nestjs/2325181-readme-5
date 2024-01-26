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
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  })
  public accessToken: string;

  @Expose()
  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  })
  public refreshToken: string;

}
