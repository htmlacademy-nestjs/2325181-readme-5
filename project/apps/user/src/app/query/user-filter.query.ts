import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId } from 'class-validator';
import { UserValidationMessage} from '../authentication/authentication.constant';
import { UserFilter} from '@project/libs/shared/app/types';

export class UserFilterQuery implements UserFilter {
  @ApiProperty({
    description: 'The list of publishers user subscribed for',
    example: ['1234-5678-9012-3456', '1234-5678-1584-3456', '1234-3268-9012-3456']
  })
  @IsOptional()
  @IsMongoId({each: true, message: UserValidationMessage.AuthorId.InvalidFormat})
  public subscribedFor?: string[];
}
