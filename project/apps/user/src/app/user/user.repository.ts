import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/libs/shared/core';
import { UserModel } from './user.model';
import { UserEntity } from './user.entity';
import { AuthUser } from '@project/libs/shared/app/types';
import { UserFilterQuery } from '../query/user-filter.query';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, AuthUser> {
  constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(userModel, UserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({email}).exec();
    return this.createEntityFromDocument(document);
  }

  public async countSubscribers(userId: string): Promise<number> {
    return await this.model.countDocuments({subscribedFor: userId}).exec();
  }

  public async index(filter: FilterQuery<UserFilterQuery>): Promise<UserEntity[]> {
    const documentsList = await this.model.find(filter).exec();
    return documentsList.map((document) => this.createEntityFromDocument(document));
  }
}
