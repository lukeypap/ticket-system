import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this._userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this._userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserDto): Promise<UserDto> {
    return this._userService.create(user);
  }

  @Delete()
  delete() {
    return 'Deleted user';
  }
}
