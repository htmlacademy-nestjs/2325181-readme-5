import { Controller, Post, UploadedFile, UseInterceptors, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';

@Controller('upload')
export class UploadController {
  constructor (
    private readonly uploaderService: UploaderService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploaderService.saveFile(file);
  }

  @Get('/:id')
  public async show(@Param(':id') id: string) {
    return 'Not implemented'
  }
}
