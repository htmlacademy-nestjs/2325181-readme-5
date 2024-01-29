import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserValidationMessage, UserValidationParams } from './dto.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User current password',
    example: '123456'
  })
  @IsNotEmpty()
  @Length(
    UserValidationParams.Password.Length.Minimal,
    UserValidationParams.Password.Length.Maximal,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  @IsString({message: UserValidationMessage.Password.InvalidPassword})
  public oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '123456'
  })
  @IsNotEmpty()
  @Length(
    UserValidationParams.Password.Length.Minimal,
    UserValidationParams.Password.Length.Maximal,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  @IsString({message: UserValidationMessage.Password.InvalidPassword})
  public newPassword: string;
}
