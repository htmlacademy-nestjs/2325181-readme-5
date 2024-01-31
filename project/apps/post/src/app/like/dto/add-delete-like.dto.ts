import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';
import { LikesValidationMessage } from '../like.constant';

export class AddDeleteLikeDto {
  @ApiProperty({
    description: 'Referred post unique ID',
    example: '1234-5678-9012-3456'
  })
  @IsNotEmpty({message: LikesValidationMessage.PostId.Required})
  @IsUUID('all', {message: LikesValidationMessage.PostId.InvalidFormat})
  public postId: string;

  @ApiProperty({
    description: 'Referred user unique ID',
    example: '1234-5678-9012-3456'
  })
  @IsNotEmpty({message: LikesValidationMessage.UserId.Required})
  @IsMongoId({message: LikesValidationMessage.UserId.InvalidFormat})
  public userId: string;
}
