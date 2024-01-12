import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploadController } from './uploader.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

const SERVE_ROOT = './static'

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }]
      },
    })
  ],
  providers: [UploaderService],
  controllers: [UploadController]
})
export class UploaderModule {}
