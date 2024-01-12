import { Module } from '@nestjs/common';
import { UploaderModule } from './uploader/uploader.module';
import { UploadConfigModule } from '@project/libs/shared/config/upload';


@Module({
  imports: [
    UploaderModule,
    UploadConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
