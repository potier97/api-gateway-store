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
      if (authHeader !== 'null' || authHeader !== null) {
        const tokens = authHeader.split(' ');
        if (tokens[0] === 'Bearer' && tokens[1].length > 0) {
          console.log(authHeader);
          // return this.client.send('onValidateJWTTp', {
          //   jwtData: authHeader,
          // });
          return true;
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
