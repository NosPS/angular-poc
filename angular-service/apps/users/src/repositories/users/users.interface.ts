import { IGeneric } from '@models/interfaces/generic.interface';
import { DeleteResult } from 'typeorm';
import { UsersEntity } from './users.entity';

export interface IUsersRepository extends IGeneric<UsersEntity> {
  deleteBatch(ids: string[]): Promise<DeleteResult>;
}
