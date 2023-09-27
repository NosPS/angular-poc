import { IsUUID } from 'class-validator';
import { CreateUserDto } from './create_user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsUUID()
  id: string;
}
