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

  public async findMany(): Promise<SubscriberEntity[]> {
    const documentList = await this.model.find().exec();
    return documentList.map((document) => this.createEntityFromDocument(document));
  }
}
