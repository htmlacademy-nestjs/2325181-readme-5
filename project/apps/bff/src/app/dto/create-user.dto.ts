import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserValidationMessage, UserValidationParams } from './dto.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.com'
  })
  @IsEmail({},{message: UserValidationMessage.Email.InvalidFormat})
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Alex'
  })
  @IsString({message: UserValidationMessage.Firstname.InvalidFormat})
  @Length(
    UserValidationParams.Firstname.Length.Minimal,
    UserValidationParams.Firstname.Length.Maximal,
    {message: UserValidationMessage.Firstname.InvalidLength}
  )
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bochkin'
  })
  @IsNotEmpty()
  @IsString({message: UserValidationMessage.Lastname.InvalidFormat})
  @Length(
    UserValidationParams.Lastname.Length.Minimal,
    UserValidationParams.Lastname.Length.Maximal,
    {message: UserValidationMessage.Lastname.InvalidLength}
  )
  public lastname: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'picture.jpg'
  })
  @IsOptional()
  @IsString({message: UserValidationMessage.Lastname.InvalidFormat})
  @Matches(UserValidationParams.Avatar.RegexURL, {message: UserValidationMessage.Avatar.InvalidFormat})
  @Length(
    UserValidationParams.Lastname.Length.Minimal,
    UserValidationParams.Lastname.Length.Maximal,
    {message: UserValidationMessage.Lastname.InvalidLength}
  )
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsNotEmpty()
  @Length(
    UserValidationParams.Password.Length.Minimal,
    UserValidationParams.Password.Length.Maximal,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  @IsString({message: UserValidationMessage.Password.InvalidPassword})
  public password: string;
}

