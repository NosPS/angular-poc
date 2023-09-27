import { ClientsModule, Transport } from '@nestjs/microservices';

export const MicroservicesConfig = ClientsModule.register([
  {
    name: 'USERS_SERVICE',
    transport: Transport.TCP,
    options: { host: 'users', port: 80 },
  },
]);
