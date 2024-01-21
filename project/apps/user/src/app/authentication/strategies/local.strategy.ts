import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { USERNAME_FIELD } from '../authentication.constant';
import { AuthUser } from '@project/libs/shared/app/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly authService: AuthenticationService
  ) {
    super({usernameField: USERNAME_FIELD});
  }

  public async validate(email: string, password: string): Promise<AuthUser> {
    return (await this.authService.verifyUser({email, password})).toPOJO();
  }
}
