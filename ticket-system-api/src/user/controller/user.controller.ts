import { RolesGuard } from './../../auth/guards/roles.guard';
import { Role } from './../entity/role.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
//@UseInterceptors(ClassSerializerInterceptor)
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this._userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<UserDto> {
    return this._userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserDto): Promise<UserDto> {
    return this._userService.create(user);
  }

  @Patch(':id')
  update(@Body() user: UserUpdateDto, @Param() id: number): Promise<UserDto> {
    return this._userService.update(user, id);
  }

  @Delete(':id')
  delete(@Param() id: number): Promise<UserDto> {
    return this._userService.delete(id);
  }
}
