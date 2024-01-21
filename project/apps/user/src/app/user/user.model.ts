import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/libs/shared/app/types';

@Schema({
  collection: 'users',
  timestamps: true
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    default: ''
  })
  public avatar: string;

  @Prop({
    required: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

