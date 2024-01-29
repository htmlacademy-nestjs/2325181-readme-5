import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { AUTH_USER_NOT_FOUND } from '../authentication/authentication.constant';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  public async getUserEntity(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    return existUser;
  }

  public async addSubscription(userId: string, publisherId: string): Promise<UserEntity> {
    const existUser = await this.getUserEntity(userId);
    if (!existUser.subscribedFor.includes(publisherId)) {
      existUser.subscribedFor.push(publisherId);
    }
    return await this.userRepository.update(userId, existUser)
  }

  public async removeSubscription(userId: string, publisherId: string): Promise<UserEntity> {
    const existUser = await this.getUserEntity(userId);
    if (existUser.subscribedFor.includes(publisherId)) {
      existUser.subscribedFor = existUser.subscribedFor.filter((suscribedId) => suscribedId !== publisherId);
    }
    return await this.userRepository.update(userId, existUser)
  }

  public async countSubscribers(userId: string): Promise<number> {
    return await this.userRepository.countSubscribers(userId);
  }

  public async indexUsers(authorList: string[]): Promise<UserEntity[]> {
    const authorIdList = authorList.map((authorId) => new Types.ObjectId(authorId));
    const usersFilter = {_id: { $in: authorIdList}};
    return await this.userRepository.index(usersFilter);
  }
}
