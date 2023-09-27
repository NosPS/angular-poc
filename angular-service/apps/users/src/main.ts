import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

const logger = new Logger();
const port = 80;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: port },
  });
  await app.listen();
  logger.log('Users run on port ' + port);
}
bootstrap();
