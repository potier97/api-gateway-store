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
import { newBuyTp, generalNewBuyRoute } from '@configdata/path';
import config from '@configdata/env-config';
import { FacturasDto } from '@dtos/facturas.dto';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalNewBuyRoute)
export class BuyController {
  private readonly logger = new Logger(BuyController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  create(@Body() body: FacturasDto): Observable<any> {
    try {
      this.logger.log(`Creando registro de ${generalNewBuyRoute}`);
      return this.client.send<any>(newBuyTp, body);
    } catch (e) {
      this.logger.error(`Error al crear registro de ${generalNewBuyRoute}`);
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Compra No Realizada',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
