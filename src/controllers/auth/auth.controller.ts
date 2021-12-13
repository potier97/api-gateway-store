import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { loginUserTp, generalAuthRoute } from '@configdata/path';

//Importados
import { ApiKeyGuard } from '@guards/api-key.guard';
import config from '@configdata/env-config';
import { AuthDto } from '@dtos/auth.dto';

@UseGuards(ApiKeyGuard)
@Controller(generalAuthRoute)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  async authenticate(@Body() body: AuthDto): Promise<any> {
    try {
      this.logger.log(`Loggiando en el sistema`);
      const result = await this.client.send<any>(loginUserTp, body).toPromise();
      return result;
    } catch (e) {
      this.logger.error(`Error al crear registro de ${generalAuthRoute}`);
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Error al loggear',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
