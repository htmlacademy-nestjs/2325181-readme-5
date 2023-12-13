import { Controller, UploadedFile, UseInterceptors, Post, HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(
    private readonly imageservice: ImageService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The image file has been created.'
  })
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.buffer.toString(),
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: RegExp(/(.png$|.jpg$|.jpeg|.mp4$)/i),
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      file: file?.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      file: file.buffer.toString(),
    };
  }
}
