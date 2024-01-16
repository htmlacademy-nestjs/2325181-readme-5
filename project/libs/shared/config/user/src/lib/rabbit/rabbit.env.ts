import { IsOptional, IsNotEmpty, IsString, Min, Max, IsNumber, validateOrReject } from 'class-validator';
import { MAX_PORT, MIN_PORT, RabbitValidationMessage } from './rabbit-config.constant';

export class RabbitConfig {
  @IsNotEmpty({message: RabbitValidationMessage.RabbitHostRequired})
  @IsString({message: RabbitValidationMessage.RabbitHostInvalidFormat})
  public host: string;

  @IsNotEmpty({message: RabbitValidationMessage.RabbitPasswordRequired})
  @IsString({message: RabbitValidationMessage.RabbitPasswordInvalidFormat})
  public password: string;

  @IsOptional()
  @Min(MIN_PORT, {message: RabbitValidationMessage.RabbitPortNumber})
  @Max(MAX_PORT, {message: RabbitValidationMessage.RabbitPortNumber})
  @IsNumber({},{message: RabbitValidationMessage.RabbitPortNumber})
  public port: number;

  @IsNotEmpty({message: RabbitValidationMessage.RabbitUserRequired})
  @IsString({message: RabbitValidationMessage.RabbitUserInvalidFormat})
  public user: string;

  @IsNotEmpty({message: RabbitValidationMessage.RabbitQueueRequired})
  @IsString({message: RabbitValidationMessage.RabbitQueueInvalidFormat})
  public queue: string;

  @IsNotEmpty({message: RabbitValidationMessage.RabbitExchangeRequired})
  @IsString({message: RabbitValidationMessage.RabbitExchangeInvalidFormat})
  public exchange: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
