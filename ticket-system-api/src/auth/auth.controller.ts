import { Controller, Post, Body } from '@nestjs/common';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto): Promise<ReturnUserDto> {
    return this._authService.register(user);
  }

  @Post('login')
  async login(@Body() user: UserLoginDto): Promise<{ token: string }> {
    const token = await this._authService.login(user);
    return { token: token };
  }
}
