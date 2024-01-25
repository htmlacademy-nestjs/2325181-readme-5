import { AuthUser } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';
import { genSalt, hash, compare } from 'bcrypt';
import { ObjectId } from 'mongoose';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser, Entity<string, AuthUser> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public avatar: string;
  public createdAt?: Date;
  public subscribedFor?: string[];


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
      avatar: this.avatar,
      createdAt: this.createdAt,
      subscribedFor: this.subscribedFor
    };
  }

  public populate(data: AuthUser): void {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.passwordHash = data.passwordHash;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt ?? new Date();
    this.subscribedFor = data.subscribedFor ?? [];
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
