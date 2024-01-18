import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModule } from './subscriber/subscriber.module';
import { getNotifyMongooseOptions, NotifyConfigModule } from '@project/libs/shared/config/notify';


@Module({
  imports: [
    NotifyConfigModule,
    SubscriberModule,
    MongooseModule.forRootAsync(getNotifyMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
