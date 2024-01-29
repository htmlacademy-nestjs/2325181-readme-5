import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { FileValidationParams } from './uploader.constant';

@Controller('upload')
export class UploadController {
  constructor (
    private readonly uploaderService: UploaderService,
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file',  {limits: {fileSize: FileValidationParams.AvatarSize}}))
  public async uploadAvatarFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: FileValidationParams.AvatarSize}),
          new FileTypeValidator({ fileType: FileValidationParams.MimeTypeRegex})
        ]
      })
    ) file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    const fileEntity = await this.uploaderService.saveFile(file);
    return fillDTO(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file', {limits: {fileSize: FileValidationParams.PhotoSize}}))
  public async uploadPhotoFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: FileValidationParams.PhotoSize}),
          new FileTypeValidator({ fileType: FileValidationParams.MimeTypeRegex})
        ]
      })
    ) file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    const fileEntity = await this.uploaderService.saveFile(file);
    return fillDTO(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string): Promise<UploadedFileRdo> {
    const existFile = await this.uploaderService.getFile(fileId);
    return fillDTO(UploadedFileRdo, existFile);
  }
}
