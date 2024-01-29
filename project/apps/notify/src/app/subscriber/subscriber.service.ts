import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor (
    private readonly subscriberRepository: SubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto): Promise<SubscriberEntity> {
    const { email } = subscriber;
    const existSubscriber = await this.subscriberRepository.findByEmail(email);
    if (existSubscriber) {
      return existSubscriber;
    }
    return this.subscriberRepository.save(new SubscriberEntity().populate(subscriber));
  }

  public async findSubscriberByEmail(email: string): Promise<SubscriberEntity> {
    const existSubscriber = await this.subscriberRepository.findByEmail(email);
    if (!existSubscriber) {
      throw new NotFoundException('The subscriber has not been found');
    }
    return existSubscriber;
  }

  public async updateSubscriber(email: string): Promise<SubscriberEntity> {
    const existSubscriber = await this.findSubscriberByEmail(email);
    const subscriberEntity = new SubscriberEntity()
      .populate({...existSubscriber, newPostsUpdate: new Date()});
    return await this.subscriberRepository.update(subscriberEntity.id, subscriberEntity)
  }

  public async indexSubscribers(): Promise<SubscriberEntity[]> {
    return await this.subscriberRepository.findMany();
  }
}
