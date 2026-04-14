import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessGuard } from '../auth/guards/access.guard';
import { SetAccessPayload } from '../auth/decorators/access.payload.decorator';
import type { AccessPayload } from '../auth/decorators/access.payload.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AccessGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('update-user-info')
  @UseGuards(AccessGuard)
  updateUserInfo(@SetAccessPayload() payload: AccessPayload) {
    return this.usersService.updateUserInfo(payload.sub);
  }

  @Patch('update-user-info')
  @UseGuards(AccessGuard)
  updateCurrentUser(
    @SetAccessPayload() payload: AccessPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(payload.sub, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
