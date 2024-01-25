import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';
import { LikekValidationMessage } from '../like.constant';

export class AddDeleteLikeDto {
  @ApiProperty({
    description: 'Referred post unique ID',
    example: '1234-5678-9012-3456'
  })
  @IsNotEmpty({message: LikekValidationMessage.PostId.Required})
  @IsUUID('all', {message: LikekValidationMessage.PostId.InvalidFormat})
  public postId: string;

  @ApiProperty({
    description: 'Referred user unique ID',
    example: '1234-5678-9012-3456'
  })
  @IsNotEmpty({message: LikekValidationMessage.UserId.Required})
  @IsMongoId({message: LikekValidationMessage.UserId.InvalidFormat})
  public userId: string;
}
