import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('controller')
export class ControllerController {
  @Get()
  findAll() {
    return 'All users';
  }

  @Get(':id')
  findOne() {
    return 'One user';
  }

  @Post()
  create() {
    return 'Created user';
  }

  @Delete()
  delete() {
    return 'Deleted user';
  }
}
