import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, Max, validateOrReject, IsIn } from 'class-validator';
import { MIN_PORT, MAX_PORT, NotifyValidationMessage, ENVIRONMENTS } from './notify-config.constant';

export class NotifyConfig {
  @IsNotEmpty({message: NotifyValidationMessage.EnvironmentRequired})
  @IsString({message: NotifyValidationMessage.EnvironmentValues})
  @IsIn(ENVIRONMENTS, {message: NotifyValidationMessage.EnvironmentValues})
  public environment: string;

  @IsOptional()
  @IsNumber({}, {message: NotifyValidationMessage.DBPortInvalidFormat})
  @Min(MIN_PORT, {message: NotifyValidationMessage.DBPortInvalidFormat})
  @Max(MAX_PORT, {message: NotifyValidationMessage.DBPortInvalidFormat})
  public port: number;

  @IsNotEmpty({message: NotifyValidationMessage.DirectoryRequired})
  @IsString({message: NotifyValidationMessage.DirectoryValue})
  public NotifyDirectory: string;

  @IsNotEmpty({message: NotifyValidationMessage.DBNameRequired})
  @IsString({message: NotifyValidationMessage.DBNameInvalidFormat})
  public dbName: string;

  @IsNotEmpty({message: NotifyValidationMessage.DBHostRequired})
  @IsString({message: NotifyValidationMessage.DBHostInvalidFormat})

  public dbHost: string;

  @IsOptional()
  @IsNumber({}, {message: NotifyValidationMessage.DBPortInvalidFormat})
  @Min(MIN_PORT, {message: NotifyValidationMessage.DBPortInvalidFormat})
  @Max(MAX_PORT, {message: NotifyValidationMessage.DBPortInvalidFormat})
  public dbPort: number;

  @IsNotEmpty({message: NotifyValidationMessage.DBUserRequired})
  @IsString({message: NotifyValidationMessage.DBUserInvalidFormat})
  public dbUser: string;

  @IsNotEmpty({message: NotifyValidationMessage.DBPasswordRequired})
  @IsString({message: NotifyValidationMessage.DBPasswordInvalidFormat})
  public dbPassword: string;

  @IsNotEmpty({message: NotifyValidationMessage.DBBaseAuthRequired})
  @IsString({message: NotifyValidationMessage.DBBaseAuthInvalidFormat})
  public dbAuthBase: string;

  @IsNotEmpty({message: NotifyValidationMessage.RabbitHostRequired})
  @IsString({message: NotifyValidationMessage.RabbitHostInvalidFormat})
  public rabbitHost: string;

  @IsNotEmpty({message: NotifyValidationMessage.RabbitPasswordRequired})
  @IsString({message: NotifyValidationMessage.RabbitPasswordInvalidFormat})
  public rabbitPassword: string;

  @IsOptional()
  @Min(MIN_PORT, {message: NotifyValidationMessage.DBPortInvalidFormat})
  @Max(MAX_PORT, {message: NotifyValidationMessage.PortNumber})
  @IsNumber({},{message: NotifyValidationMessage.RabbitPortNumber})
  public rabbitPort: number;

  @IsNotEmpty({message: NotifyValidationMessage.RabbitUserRequired})
  @IsString({message: NotifyValidationMessage.RabbitUserInvalidFormat})
  public rabbitUser: string;

  @IsNotEmpty({message: NotifyValidationMessage.RabbitQueueRequired})
  @IsString({message: NotifyValidationMessage.RabbitQueueInvalidFormat})
  public rabbitQueue: string;

  @IsNotEmpty({message: NotifyValidationMessage.RabbitExchangeRequired})
  @IsString({message: NotifyValidationMessage.RabbitExchangeInvalidFormat})
  public rabbitExchange: string;

  @IsNotEmpty({message: NotifyValidationMessage.MailHostRequired})
  @IsString({message: NotifyValidationMessage.MailHostInvalidFormat})
  public mailHost: string;

  @IsNotEmpty({message: NotifyValidationMessage.MailPasswordRequired})
  @IsString({message: NotifyValidationMessage.MailPasswordInvalidFormat})
  public mailPassword: string;

  @IsOptional()
  @Min(MIN_PORT, {message: NotifyValidationMessage.MailPortNumber})
  @Max(MAX_PORT, {message: NotifyValidationMessage.MailPortNumber})
  @IsNumber({},{message: NotifyValidationMessage.MailPortNumber})
  public mailPort: number;

  @IsNotEmpty({message: NotifyValidationMessage.MailUserRequired})
  @IsString({message: NotifyValidationMessage.MailUserInvalidFormat})
  public mailUser: string;

  @IsNotEmpty({message: NotifyValidationMessage.MailFromRequired})
  @IsString({message: NotifyValidationMessage.MailFromInvalidFormat})
  public mailFrom: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
