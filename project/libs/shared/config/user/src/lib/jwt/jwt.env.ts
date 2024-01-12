import { IsNotEmpty, IsString, validateOrReject } from 'class-validator';
import { JWTValidationMessage } from './jwt-config.constant';

export class JWTConfig {
  @IsNotEmpty({message: JWTValidationMessage.AccessTokenRequired})
  @IsString({message: JWTValidationMessage.AccessTokenRequired})
  public accessTokenSecret: string;

  @IsNotEmpty({message: JWTValidationMessage.AccessTokenExpirationPeriodRequired})
  @IsString({message: JWTValidationMessage.AccessTokenExpirationPeriodRequired})
  public accessTokenExpiresIn: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
