import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUsersModule } from './users/users.module';

@Module({
  imports: [AppUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
