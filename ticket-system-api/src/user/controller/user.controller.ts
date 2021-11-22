import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this._userService.findOne(id);
  }

  @Post()
  create(@Body() user: any) {
    return this._userService.create(user);
  }

  @Delete()
  delete() {
    return 'Deleted user';
  }
}
