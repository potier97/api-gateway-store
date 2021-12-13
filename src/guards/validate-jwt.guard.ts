import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';

//Importados
import envConfig from '@configdata/env-config';

@Injectable()
export class ValidateJWTGuard implements CanActivate {
  constructor(
    @Inject(envConfig().broker.name) private client: ClientProxy,
    private httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header('Authorization') || 'null';
      if (authHeader !== 'null' || authHeader !== null) {
        const tokens = authHeader.split(' ');
        if (tokens[0] === 'Bearer' && tokens[1].length > 0) {
          // console.log(authHeader);
          console.log('Llamando al token');
          const result = await this.httpService
            .post(
              'https://login-commerce-back.herokuapp.com/auth',
              {},
              {
                headers: {
                  Authorization: authHeader,
                },
              },
            )
            .toPromise();
          console.log(result.status);
          if (result.status === 401) {
            return false;
          }
          return result.data;
        }
        return true;
      }
      return false;
    } catch (e) {
      // console.log(e);
      // return false;
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'No tiene permisos de acceder',
          content: false,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
