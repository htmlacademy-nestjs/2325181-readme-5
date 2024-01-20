import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigUserModule, getMongooseOptions } from '@project/libs/shared/config/user';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotifyUserModule } from './notify/notify.module';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUserModule,
    NotifyUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
