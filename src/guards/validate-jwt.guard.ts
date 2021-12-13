import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

//Importados
import envConfig from '@configdata/env-config';
// import { validateJWTTp } from '@configdata/path';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateJWTGuard implements CanActivate {
  constructor(@Inject(envConfig().broker.name) private client: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header('Authorization') || 'null';
      console.log(authHeader);
      return true;
      // return this.client.send('onValidateJWTTp', {
      //   jwtData: authHeader,
      // });
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
