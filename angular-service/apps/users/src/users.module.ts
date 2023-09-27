import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModuleConfig } from '@configs/typeOrmModule.config';
import { UsersRepositryModule } from './repositories/users/users.module';

@Module({
  imports: [...TypeOrmModuleConfig, UsersRepositryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
