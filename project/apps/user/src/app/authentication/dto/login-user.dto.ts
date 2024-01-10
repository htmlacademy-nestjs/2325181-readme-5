import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationMessage, UserValidationParams } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.com'
  })
  @IsEmail({},{message: UserValidationMessage.Email.InvalidFormat})
  public email: string;


  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @Length(
    UserValidationParams.Password.Length.Minimal,
    UserValidationParams.Password.Length.Maximal,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  @IsString({message: UserValidationMessage.Password.InvalidPassword})
  public password: string;
}
