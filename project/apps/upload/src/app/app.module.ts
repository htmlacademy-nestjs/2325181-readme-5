import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderModule } from './uploader/uploader.module';
import { UploadConfigModule, getUploadMongooseOptions } from '@project/libs/shared/config/upload';


@Module({
  imports: [
    UploaderModule,
    UploadConfigModule,
    MongooseModule.forRootAsync(getUploadMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
