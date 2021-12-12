import { Global, Module } from '@nestjs/common';
import {
  ClientsModule,
  ClientsModuleOptions,
  Transport,
} from '@nestjs/microservices';

//IMPORTADOS
import config from '@configdata/env-config';
// console.log(process.env.NODE_ENV);

const appConfig = config().broker;
const host = appConfig.url;
const queue = appConfig.queue;
const name = appConfig.name;
//CONFIGURACION DE CONEXION A RABBIT
const microserviceClientOptions: ClientsModuleOptions = [
  {
    name: name,
    transport: Transport.RMQ,
    options: {
      urls: [host],
      queue: queue,
      queueOptions: {
        durable: false,
      },
    },
  },
];

@Global()
@Module({
  imports: [ClientsModule.register(microserviceClientOptions)],
  exports: [ClientsModule],
})
export class BrokerModule {}
