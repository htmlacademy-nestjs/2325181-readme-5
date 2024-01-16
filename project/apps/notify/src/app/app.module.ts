import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModule } from './subscriber/subscriber.module';
import { getNotifyMongooseOptions, NotifyConfigModule } from '@project/libs/shared/config/notify';


@Module({
  imports: [
    MongooseModule.forRootAsync(getNotifyMongooseOptions()),
    NotifyConfigModule,
    SubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
