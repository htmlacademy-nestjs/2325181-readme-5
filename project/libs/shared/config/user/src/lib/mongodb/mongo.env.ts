import { IsNumber, Min, Max, IsString, validateOrReject, IsOptional } from 'class-validator';
import { MAX_PORT, MIN_PORT, MongoValidationMessage } from './mongo.const';

export class MongoConfiguration {
  @IsString({message: MongoValidationMessage.DBNameRequired})
  public name: string;

  @IsString({message: MongoValidationMessage.DBHostRequired})
  public host: string;

  @IsOptional()
  @IsNumber({}, {message: MongoValidationMessage.DBPortRequired})
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({message: MongoValidationMessage.DBUserRequired})
  public user: string;

  @IsString({message: MongoValidationMessage.DBPasswordRequired})
  public password: string;

  @IsString({message: MongoValidationMessage.DBBaseAuthRequired})
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
