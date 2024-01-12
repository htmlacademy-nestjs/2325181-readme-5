import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UploadConfig } from '@project/libs/shared/config/upload';
import { join } from 'path';
import 'multer';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';

@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name);

  constructor (
    @Inject(UploadConfig.KEY)
    private readonly config: ConfigType<typeof UploadConfig>
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);
      const destinationFile = this.getDestinationFilePath(`${filename}.${fileExtension}`);
      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);
      return destinationFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
