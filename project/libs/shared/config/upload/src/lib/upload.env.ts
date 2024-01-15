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

  @IsNotEmpty({message: UploadValidationMessage.DBNameRequired})
  @IsString({message: UploadValidationMessage.DBNameInvalidFormat})
  public dbName: string;

  @IsNotEmpty({message: UploadValidationMessage.DBHostRequired})
  @IsString({message: UploadValidationMessage.DBHostInvalidFormat})
  public dbHost: string;

  @IsOptional()
  @IsNumber({}, {message: UploadValidationMessage.DBPortInvalidFormat})
  @Min(MIN_PORT, {message: UploadValidationMessage.DBPortInvalidFormat})
  @Max(MAX_PORT, {message: UploadValidationMessage.DBPortInvalidFormat})
  public dbPort: number;

  @IsNotEmpty({message: UploadValidationMessage.DBUserRequired})
  @IsString({message: UploadValidationMessage.DBUserInvalidFormat})
  public dbUser: string;

  @IsNotEmpty({message: UploadValidationMessage.DBPasswordRequired})
  @IsString({message: UploadValidationMessage.DBPasswordInvalidFormat})
  public dbPassword: string;

  @IsNotEmpty({message: UploadValidationMessage.DBBaseAuthRequired})
  @IsString({message: UploadValidationMessage.DBBaseAuthInvalidFormat})
  public dbAuthBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
