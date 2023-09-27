import { GenderEnum } from '../enums/gender.enum';

export class UsersDto {
  id: string;
  name: string;
  age: number;
  gender: GenderEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
