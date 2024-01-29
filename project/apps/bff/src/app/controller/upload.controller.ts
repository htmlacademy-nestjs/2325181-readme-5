import { HttpService } from '@nestjs/axios';
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileRdo } from '../rdo';
import { MongoIdValidationPipe } from '@project/libs/shared/core';
import { ApplicationServiceURL } from '../app.config';

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
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
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
      if (err.response.status === 400) {
        throw new BadRequestException('Validation error.');
      }
    }
  }

  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string): Promise<UploadedFileRdo> {
    try {
      const { data } = await this.httpService.axiosRef.get<UploadedFileRdo>(`${ApplicationServiceURL.Upload}/${fileId}`);
      return data;
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException('File not found');
      }
    }
  }
}
