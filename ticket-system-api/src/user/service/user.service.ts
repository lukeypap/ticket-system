import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDto as User } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const userDto = plainToInstance(User, await this._userRepo.save(user));
    return userDto;
  }

  async findAll(): Promise<User[]> {
    const userDto = plainToInstance(User, await this._userRepo.find());
    return userDto;
  }

  async findOne(id: number): Promise<User> {
    const userDto = plainToInstance(User, await this._userRepo.findOne(id));
    return userDto;
  }

  async update(user: User, id: number): Promise<User> {
    await this._userRepo.update(id, user);
    const userDto = plainToInstance(User, this._userRepo.findOne(id));
    return userDto;
  }

  async delete(id: number): Promise<User> {
    this._userRepo.delete(id);
    const userDto = plainToInstance(User, await this._userRepo.findOne(id));
    return userDto;
  }
}
