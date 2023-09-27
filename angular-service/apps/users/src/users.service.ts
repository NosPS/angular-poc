import { Injectable } from '@nestjs/common';
import { IUsersService } from './users.interface';
import { UsersRepository } from './repositories/users/users.repository';
import { UsersDto } from '@models/dtos/users.dto';
import { UsersMapping } from './mapping/users/users.mapping';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PageDto } from '@dtos/dtos/page.dto';
import { PageOptionsDto } from '@dtos/dtos/page_options.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getById(id: string): Promise<UsersDto> {
    let result = await this.usersRepository.getById(id);
    return UsersMapping.mapToDto(result);
  }

  async getAll(): Promise<UsersDto[]> {
    let result = await this.usersRepository.getAll();
    return UsersMapping.mapToDtoArray(result);
  }

  async pagination(pageOptions: PageOptionsDto): Promise<PageDto<UsersDto>> {
    return await this.usersRepository.pagination(pageOptions);
  }

  async create(entity: UsersDto): Promise<UsersDto> {
    let result = await this.usersRepository.create(
      UsersMapping.mapToEntity(entity),
    );
    return UsersMapping.mapToDto(result);
  }

  async update(entity: UsersDto): Promise<UpdateResult> {
    return await this.usersRepository.update(UsersMapping.mapToEntity(entity));
  }

  async softDelete(id: string): Promise<UpdateResult> {
    return await this.usersRepository.softDelete(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async deleteBatch(ids: string[]): Promise<DeleteResult> {
    return await this.usersRepository.deleteBatch(ids);
  }
}
