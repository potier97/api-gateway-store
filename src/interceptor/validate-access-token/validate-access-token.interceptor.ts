import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
//Importados
import { exampleTp } from '@configdata/path';
import config from '@configdata/env-config';

@Injectable()
export class ValidateAccessTokenInterceptor implements NestInterceptor {
  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // this.client
    //   .send<number>(exampleTp, [4, 4, 2])
    //   .subscribe((a) => console.log('result ', a));
    // console.log(`resultContext`);

    return next.handle();
  }
}
