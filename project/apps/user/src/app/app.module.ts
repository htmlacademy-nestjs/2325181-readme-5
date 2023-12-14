import { Module } from '@nestjs/common';
import { ConfigUserModule } from '@project/libs/shared/config/user';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UserModule, AuthenticationModule, ConfigUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
