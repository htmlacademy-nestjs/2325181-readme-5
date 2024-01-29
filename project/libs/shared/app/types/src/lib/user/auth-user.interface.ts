import { User } from './user.interface';

export interface AuthUser extends User {
  passwordHash: string,
  avatar: string,
  createdAt?: Date,
  subscribedFor?: string[]
}
