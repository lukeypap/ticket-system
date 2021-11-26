import { Inject, Injectable } from '@nestjs/common';
import { UserDto as User } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  create(user: User): Promise<User> {
    return this._userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this._userRepo.find();
  }

  findOne(id: number): Promise<User> {
    return this._userRepo.findOne(id);
  }

  async update(user: User, id: number): Promise<User> {
    await this._userRepo.update(id, user);
    return this._userRepo.findOne(id);
  }

  async delete(id: number): Promise<User> {
    const user = await this._userRepo.findOne(id);
    this._userRepo.delete(id);
    return user;
  }
}
