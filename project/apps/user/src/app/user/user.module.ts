import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserMongoRepository } from './user-mongo.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: UserModule.name, schema: UserSchema}
  ])],
  providers: [UserMongoRepository],
  exports: [UserMongoRepository],
})
export class UserModule {}
