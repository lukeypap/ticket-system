import { Delete, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto as User } from 'src/user/dto/user.dto';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: User): Promise<ReturnUserDto> {
    user.password = await this.hashPassword(user.password);
    await this._userRepo.save(user);
    delete user.password;
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this._userRepo.findOne(
      { email },
      {
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      },
    );
    if (!user) {
      return;
    } else if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
  }

  async login(user: UserLoginDto): Promise<string> {
    const { email, password } = user;
    const validatedUser = await this.validateUser(email, password);
    if (validatedUser) {
      //create JWT
      return await this._jwtService.signAsync({ validatedUser });
    }
  }
}
