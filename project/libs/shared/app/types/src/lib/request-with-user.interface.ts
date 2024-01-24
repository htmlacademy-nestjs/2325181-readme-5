import { AuthUser } from './user/auth-user.interface';


export interface RequestWithUser {
  user?: AuthUser;
}
