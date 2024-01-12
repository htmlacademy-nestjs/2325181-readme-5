import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, Max, validateOrReject, IsIn } from 'class-validator';
import { MIN_PORT, MAX_PORT, UploadValidationMessage, ENVIRONMENTS } from './upload-config.constant';

export class UploadConfig {
  @IsNotEmpty({message: UploadValidationMessage.EnvironmentRequired})
  @IsString({message: UploadValidationMessage.EnvironmentValues})
  @IsIn(ENVIRONMENTS, {message: UploadValidationMessage.EnvironmentValues})
  public environment: string;

  @IsOptional()
  @IsNumber({}, {message: UploadValidationMessage.PortNumber})
  @Min(MIN_PORT, {message: UploadValidationMessage.PortNumber})
  @Max(MAX_PORT, {message: UploadValidationMessage.PortNumber})
  public port: number;

  @IsNotEmpty({message: UploadValidationMessage.DirectoryRequired})
  @IsString({message: UploadValidationMessage.DirectoryValue})
  public uploadDirectory: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
