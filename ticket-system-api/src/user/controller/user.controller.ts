import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
//@UseInterceptors(ClassSerializerInterceptor)
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

  @Put(':id')
  update(@Body() user: UserDto, @Param() id: number): Promise<UserDto> {
    return this._userService.update(user, id);
  }

  @Delete(':id')
  delete(@Param() id: number): Promise<UserDto> {
    return this._userService.delete(id);
  }
}
