import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { UsersDto } from '@models/dtos/users.dto';
import { PageOptionsDto } from '@dtos/dtos/page_options.dto';
import { CreateUserDto } from '@dtos/dtos/create_user.dto';
import { UpdateUserDto } from '@dtos/dtos/update_user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'users_getById' })
  async users_getById(id: string) {
    return await this.usersService.getById(id);
  }

  @MessagePattern({ cmd: 'users_getAll' })
  async users_getAll() {
    return await this.usersService.getAll();
  }

  @MessagePattern({ cmd: 'users_pagination' })
  async users_pagination(pageOptions: PageOptionsDto) {
    return await this.usersService.pagination(pageOptions);
  }

  @MessagePattern({ cmd: 'users_create' })
  async users_create(user: CreateUserDto) {
    let userDto = new UsersDto();
    userDto.name = user.name;
    userDto.age = user.age;
    userDto.gender = user.gender;
    return await this.usersService.create(userDto);
  }

  @MessagePattern({ cmd: 'users_update' })
  async users_update(user: UpdateUserDto) {
    let userDto = new UsersDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.age = user.age;
    userDto.gender = user.gender;
    return await this.usersService.update(userDto);
  }

  @MessagePattern({ cmd: 'users_softDelete' })
  async users_softDelete(id: string) {
    return await this.usersService.softDelete(id);
  }

  @MessagePattern({ cmd: 'users_delete' })
  async users_delete(id: string) {
    return await this.usersService.delete(id);
  }

  @MessagePattern({ cmd: 'users_deleteBatch' })
  async users_deleteBatch(ids: string[]) {
    return await this.usersService.deleteBatch(ids);
  }
}
