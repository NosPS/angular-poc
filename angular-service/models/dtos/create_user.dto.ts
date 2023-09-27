import { GenderEnum } from '@dtos/enums/gender.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  age: number;

  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
