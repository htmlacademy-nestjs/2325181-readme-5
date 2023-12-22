import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserModel} from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: UserModel.name, schema: UserSchema}
  ])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
