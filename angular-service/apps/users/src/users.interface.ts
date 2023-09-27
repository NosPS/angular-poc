import { UsersDto } from '@models/dtos/users.dto';
import { IGeneric } from '@models/interfaces/generic.interface';
import { DeleteResult } from 'typeorm';

export interface IUsersService extends IGeneric<UsersDto> {
  deleteBatch(ids: string[]): Promise<DeleteResult>;
}
