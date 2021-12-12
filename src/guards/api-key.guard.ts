import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';

//Importados
import envConfig from '@configdata/env-config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(envConfig.KEY) private configService: ConfigType<typeof envConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('X-api-key-access');
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'No está autorizado a consumir esta api',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return isAuth;
  }
}
