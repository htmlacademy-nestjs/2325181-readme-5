import { Subscriber } from '@project/libs/shared/app/types';
import { Entity } from '@project/libs/shared/core';

export class SubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public newPostsUpdate?: Date;

  toPOJO() {
    return {
      id: this.id,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      newPostsUpdate: this.newPostsUpdate,
    }
  }

  public populate(data: Subscriber): SubscriberEntity {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.newPostsUpdate = data.newPostsUpdate || new Date();
    return this;
  }

  static fromObject(data:Subscriber): SubscriberEntity {
    return new SubscriberEntity().populate(data);
  }
}
