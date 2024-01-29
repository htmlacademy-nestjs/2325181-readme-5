import { HttpService } from '@nestjs/axios';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, BadRequestException, NotFoundException, HttpStatus } from '@nestjs/common';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileRdo } from '../rdo';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { ApplicationServiceURL } from '../app.config';
import { ExceptionMessage } from '../app.constant';

@Controller('upload')
export class UploadController {
  constructor (
    private readonly httpService: HttpService
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatarFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(`${ApplicationServiceURL.Upload}/avatar`, file);
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(ExceptionMessage.ValidationError);
      }
    }
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhotoFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    try {
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(`${ApplicationServiceURL.Upload}/photo`, file);
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(ExceptionMessage.ValidationError);
      }
    }
  }

  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string): Promise<UploadedFileRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<UploadedFileRdo>(`${ApplicationServiceURL.Upload}/${fileId}`);
      return data;
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(ExceptionMessage.FileNotFound);
      }
    }
  }
}
