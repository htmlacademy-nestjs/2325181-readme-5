import { Subscriber } from '@project/libs/shared/app/types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'subscribers',
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})
export class SubscriberModel extends Document implements Subscriber {
  public id?: string;

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

  @Prop()
  public newPostsUpdate: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);

SubscriberSchema.virtual('id').get(function() {
  return this._id.toString();
})
