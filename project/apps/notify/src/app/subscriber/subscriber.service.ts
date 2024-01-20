import { CreateSubscriberDto } from './create-subscriber.dto';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';

export class SubscriberService {
  constructor (
    private readonly subscriberRepository: SubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.subscriberRepository.findByEmail(email);
    if (existSubscriber) {
      return existSubscriber;
    }
    return this.subscriberRepository.save(new SubscriberEntity().populate(subscriber));
  }
}
