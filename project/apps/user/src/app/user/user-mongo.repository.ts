import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from '@project/libs/shared/app/types';
import { CRUDRepository } from '@project/shared/util/types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserMongoRepository implements CRUDRepository<UserEntity, string, AuthUser> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async create(item: UserEntity): Promise<AuthUser> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findById(id: string): Promise<AuthUser> {
    return this.userModel.findOne({_id: id}).exec();
  }

  public async findByEmail(email: string): Promise<AuthUser> {
    return this.userModel.findOne({email}).exec();
  }

  public async update(id: string, item: UserEntity): Promise<AuthUser> {
    return this.userModel
      .findByIdAndUpdate(id, item.toPOJO(), {new: true})
      .exec();
  }

}
