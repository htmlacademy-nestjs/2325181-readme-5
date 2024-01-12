import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploadController } from './uploader.controller';

@Module({
  imports: [],
  providers: [UploaderService],
  controllers: [UploadController]
})
export class UploaderModule {}
