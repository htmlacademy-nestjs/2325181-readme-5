import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Alex'
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bochkin'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}

