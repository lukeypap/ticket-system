import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './controller/user.controller';
import { UserEntity } from './entity/user.entity';
import { userProviders } from './providers/user.providers';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
