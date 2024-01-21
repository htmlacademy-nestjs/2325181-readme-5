import { TokenPayload, AuthUser } from '@project/libs/shared/app/types';

export function createJWTPayload(user: AuthUser): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    firstName: user.firstname,
    lastName: user.lastname
  }
}
