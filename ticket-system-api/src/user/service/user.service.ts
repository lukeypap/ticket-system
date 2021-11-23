import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepo: Repository<UserEntity>,
  ) {}

  create(user: UserDto): Promise<UserDto> {
    return this.userRepo.save(user);
  }

  findAll(): Promise<UserDto[]> {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return id;
  }
}
