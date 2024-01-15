import { AuthUser } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser, Entity<string, AuthUser> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public likesList: string[];

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO () {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      passwordHash: this.passwordHash,
      likesList: this.likesList,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.likesList = data.likesList;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): UserEntity {
    return new UserEntity(data);
  }
}
