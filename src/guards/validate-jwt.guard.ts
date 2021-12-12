import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
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
      // console.log(authHeader);
      return this.client.send('onValidateJWTTp', {
        jwtData: authHeader,
      });
      // const algo = isValid.pipe((v: any) => {
      //   console.log(v);
      //   return v;
      // });
      // isValid.subscribe((v: any) => console.log(v));
      // console.log(authHeader);
      // console.log(isValid);
      // console.log('algo ', algo);
      // if (!isValid) {
      //   throw new HttpException(
      //     {
      //       status: HttpStatus.UNAUTHORIZED,
      //       message: 'Acceso restringido',
      //     },
      //     HttpStatus.UNAUTHORIZED,
      //   );
      // }
      // return isValid;
    } catch (e) {
      console.log(e);
      throw new RpcException('Invalid credentials.');
      // return false;
    }
  }
}
