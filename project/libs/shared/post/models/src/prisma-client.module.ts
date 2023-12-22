import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './index'

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
