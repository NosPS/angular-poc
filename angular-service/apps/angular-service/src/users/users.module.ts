import { Module } from '@nestjs/common';
import { MicroservicesConfig } from '@configs/microservices.config';
import { AppUsersController } from './users.controller';
import { RxjsProvider } from '@providers/rxjs.provider';
import { AppUsersService } from './users.service';

@Module({
  imports: [MicroservicesConfig],
  controllers: [AppUsersController],
  providers: [RxjsProvider, AppUsersService],
})
export class AppUsersModule {}
