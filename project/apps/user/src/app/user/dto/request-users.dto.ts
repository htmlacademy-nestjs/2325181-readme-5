import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { UserValidationMessage, UserValidationParams } from '../../authentication/authentication.constant';

export class RequestUsersDto {
  @ApiProperty({
    description: 'The list of publishers user subscribed for',
    example: ['1234-5678-9012-3456', '1234-5678-1584-3456', '1234-3268-9012-3456']
  })
  @IsOptional()
  @IsMongoId({each: true, message: UserValidationMessage.AuthorId.InvalidFormat})
  public authorList?: string[];
}
