import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';
import { BaseMongoRepository } from '@project/libs/shared/core';

@Injectable()
export class SubscriberRepository extends BaseMongoRepository<SubscriberEntity, SubscriberModel> {
  constructor (
    @InjectModel(SubscriberModel.name) subscriberModel: Model<SubscriberModel>
  ) {
    super(subscriberModel, SubscriberEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<SubscriberEntity | null> {
    const document = await this.model.findOne({email}).exec();
    return this.createEntityFromDocument(document);
  }

  public async findFollowers(email: string): Promise<number> {
    return await this.model.countDocuments({followUp: email});
  }

  public async addSubscription(email: string, emailSubscribe: string): Promise<SubscriberEntity> {
    const subscriberUpdate = await this.model
      .findOneAndUpdate({email},{$addToSet: {followUp: emailSubscribe}},);
    return this.createEntityFromDocument(subscriberUpdate)
  }

  public async removeSubscription(email: string, emailUnsubscribe: string): Promise<SubscriberEntity> {
    const subscriberUpdate = await this.model
      .findOneAndUpdate({email},{$pull: {followUp: emailUnsubscribe}}, {returnDocument: 'after'})
    return this.createEntityFromDocument(subscriberUpdate)
  }
}
