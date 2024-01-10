import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/libs/shared/core';
import { UserModel } from './user.model';
import { UserEntity } from './user.entity';
import { AuthUser } from '@project/libs/shared/app/types';

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

  public async index(): Promise<UserEntity[]> {
    const documentsList = await this.model.find().exec();
    return documentsList.map(
      (document) => this.createEntityFromDocument(document)
    );
  }
}
