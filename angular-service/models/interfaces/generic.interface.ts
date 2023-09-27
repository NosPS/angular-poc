import { DeleteResult, UpdateResult } from 'typeorm';

export interface IGeneric<T> {
  getById(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<UpdateResult>;
  softDelete(id: string): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
}
