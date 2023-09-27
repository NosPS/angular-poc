import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppUsersService } from './users.service';
import { PageOptionsDto } from '@dtos/dtos/page_options.dto';
import { OrderByEnum } from '@dtos/enums/order_by.enum';
import { OrderEnum } from '@dtos/enums/order.enum';
import { UsersDto } from '@dtos/dtos/users.dto';
import { CreateUserDto } from '@dtos/dtos/create_user.dto';
import { UpdateUserDto } from '@dtos/dtos/update_user.dto';

@Controller('user')
export class AppUsersController {
  constructor(private readonly appUsersService: AppUsersService) {}

  @Get('getbyid/:id')
  async getById(@Param('id') id: string) {
    return await this.appUsersService.getById(id);
  }

  @Get('pagination')
  async pagination(@Query() pageOptions: PageOptionsDto) {
    return await this.appUsersService.pagination(pageOptions);
  }

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    let userDto = new UsersDto();
    userDto.name = user.name;
    userDto.age = user.age;
    userDto.gender = user.gender;
    return await this.appUsersService.create(userDto);
  }

  @Put('update')
  async update(@Body() user: UpdateUserDto) {
    let userDto = new UsersDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.age = user.age;
    userDto.gender = user.gender;
    return await this.appUsersService.update(userDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.appUsersService.delete(id);
  }

  @Delete('deletebatch')
  async deleteBatch(@Body() ids: string[]) {
    return await this.appUsersService.deleteBatch(ids);
  }
}
