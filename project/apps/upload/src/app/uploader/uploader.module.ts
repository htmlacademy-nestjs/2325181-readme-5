import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploadController } from './uploader.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { UploaderRepository } from './uploader.repository';

const SERVE_ROOT = './static'

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        const serveRoot = configService.get<string>('application.serveRoot')
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      {name: FileModel.name, schema: FileSchema}
    ])
  ],
  providers: [UploaderService, UploaderRepository],
  controllers: [UploadController]
})
export class UploaderModule {}
