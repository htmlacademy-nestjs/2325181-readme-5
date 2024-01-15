import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/libs/shared/config/user';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })
  ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
