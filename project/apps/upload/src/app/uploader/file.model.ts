import { Schema, Prop, SchemaFactory,  } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { File } from '@project/libs/shared/app/types';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export class FileModel extends Document implements File {
  public id?: string;

  @Prop({
    requred: true
  })
  public originalName: string;

  @Prop({
    requred: true
  })
  public subdirectory: string;

  @Prop({
    requred: true
  })
  public size: number;

  @Prop({
    requred: true
  })
  public mimetype: string;

  @Prop({
    requred: true
  })
  public hashName: string;

  @Prop({
    requred: true
  })
  public path: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);

FileSchema.virtual('id').get(function() {
  return this._id.toString();
});
