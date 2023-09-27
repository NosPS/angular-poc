import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { IUsersRepository } from './users.interface';
import { PageOptionsDto } from '@dtos/dtos/page_options.dto';
import { PageDto } from '@dtos/dtos/page.dto';
import { UsersDto } from '@dtos/dtos/users.dto';
import { GenderEnum } from '@dtos/enums/gender.enum';
import { OrderByEnum } from '@dtos/enums/order_by.enum';
import { PageMetaDto } from '@dtos/dtos/page_meta.dto';
import { UsersMapping } from '../../mapping/users/users.mapping';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async getById(id: string): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async getAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async pagination(pageOptions: PageOptionsDto): Promise<PageDto<UsersDto>> {
    let users: UsersEntity[];
    let count: number;

    if (pageOptions.search) {
      users = await this.usersRepository
        .createQueryBuilder('users')
        .where(
          'users.name ILIKE :pattern OR CAST(users.age AS TEXT) ILIKE :pattern OR CAST(users.gender AS TEXT) ILIKE :pattern',
          { pattern: `%${pageOptions.search}%` },
        )
        .orderBy(`users.${pageOptions.orderBy}`, pageOptions.order)
        .skip((pageOptions.page - 1) * pageOptions.pageSize)
        .take(pageOptions.pageSize)
        .getMany();
      count = await this.usersRepository
        .createQueryBuilder('users')
        .where(
          'users.name ILIKE :pattern OR CAST(users.age AS TEXT) ILIKE :pattern OR CAST(users.gender AS TEXT) ILIKE :pattern',
          { pattern: `%${pageOptions.search}%` },
        )
        .getCount();
    } else {
      users = await this.usersRepository
        .createQueryBuilder('users')
        .orderBy(`users.${pageOptions.orderBy}`, pageOptions.order)
        .skip((pageOptions.page - 1) * pageOptions.pageSize)
        .take(pageOptions.pageSize)
        .getMany();
      count = await this.usersRepository.count();
    }

    let usersDto = UsersMapping.mapToDtoArray(users);

    let pageMeta = new PageMetaDto(count, pageOptions);
    let page = new PageDto(usersDto, pageMeta);

    return page;
  }

  async create(entity: UsersEntity): Promise<UsersEntity> {
    return await this.usersRepository.save(entity);
  }

  async update(entity: UsersEntity): Promise<UpdateResult> {
    let user = await this.usersRepository.findOneBy({ id: entity.id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return await this.usersRepository.update(entity.id, entity);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    let user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return await this.usersRepository.softDelete(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    let user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return await this.usersRepository.delete(id);
  }

  async deleteBatch(ids: string[]): Promise<DeleteResult> {
    let users = await this.usersRepository.findBy({ id: In(ids) });
    if (!users) {
      throw new NotFoundException('Some users not found.');
    }
    return await this.usersRepository.delete({ id: In(ids) });
  }
}
