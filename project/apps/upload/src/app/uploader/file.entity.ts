import { Entity } from '@project/libs/shared/core';
import { File } from '@project/libs/shared/app/types';

export class FileEntity implements File, Entity<string, File> {
  public id?: string;
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public subdirectory: string;

  public toPOJO() {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subdirectory: this.subdirectory
    }
  }

  public populate(data: File): FileEntity {
    this.id = data.id ?? undefined;
    this.originalName = data.originalName;
    this.size = data.size;
    this.mimetype = data.mimetype;
    this.hashName = data.hashName;
    this.subdirectory = data.subdirectory;
    this.path = data.path;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    return this;
  }

  static fromObject(data: File): FileEntity {
    return new FileEntity().populate(data);
  }
}
