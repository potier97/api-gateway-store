import {
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

//Importados
import { exampleTp } from '@configdata/path';
import config from '@configdata/env-config';
import { ValidateAccessTokenInterceptor } from '@interceptors/validate-access-token/validate-access-token.interceptor';
import { ApiKeyGuard } from '@guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@UseInterceptors(ValidateAccessTokenInterceptor)
@Controller()
export class AppController {
  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Get('/example')
  publish(): Observable<number> {
    console.log('enviando');
    return this.client.send<number>(exampleTp, [1, 2, 3]);
  }
}
