import { GenderEnum } from '../enums/gender.enum';

export class User {
  id!: string;
  name!: string;
  age!: number;
  gender!: GenderEnum;
}
