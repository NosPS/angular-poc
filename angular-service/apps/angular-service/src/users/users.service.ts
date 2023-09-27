import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IAppUsersService } from './users.interface';
import { UsersDto } from '@dtos/dtos/users.dto';
import { PageOptionsDto } from '@dtos/dtos/page_options.dto';
import { PageDto } from '@dtos/dtos/page.dto';

@Injectable()
export class AppUsersService implements IAppUsersService {
  constructor(
    @Inject('USERS_SERVICE')
    private usersService: ClientProxy,
    @Inject('RxjsProvider')
    private readonly rxjsProvider: any,
  ) {}

  async getById(id: string): Promise<UsersDto> {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_getById' }, id),
    );
  }

  async pagination(pageOptions: PageOptionsDto): Promise<PageDto<UsersDto>> {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_pagination' }, pageOptions),
    );
  }

  async create(user: UsersDto) {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_create' }, user),
    );
  }

  async update(user: UsersDto) {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_update' }, user),
    );
  }

  async delete(id: string) {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_delete' }, id),
    );
  }

  async deleteBatch(ids: string[]) {
    return await this.rxjsProvider.lastValueFrom(
      this.usersService.send({ cmd: 'users_deleteBatch' }, ids),
    );
  }
}
