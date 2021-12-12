import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  payModeCreateTp,
  payModeUpdateTp,
  payModeDeleteTp,
  payModeGetByIdTp,
  payModeGetAllTp,
  generalPaymentsModeRoute,
} from '@configdata/path';
import config from '@configdata/env-config';
import { ModosPagosDto, UpdatModosPagosDto } from '@dtos/modospagos.dto';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalPaymentsModeRoute)
export class PayModeController {
  private readonly logger = new Logger(PayModeController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  create(@Body() body: ModosPagosDto): Observable<any> {
    try {
      this.logger.log(`Creando registro de ${generalPaymentsModeRoute}`);
      return this.client.send<any>(payModeCreateTp, body);
    } catch (e) {
      this.logger.error(
        `Error al crear registro de ${generalPaymentsModeRoute}`,
      );
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No creado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatModosPagosDto,
  ): Observable<any> {
    try {
      this.logger.log(`Actualizando registro de ${generalPaymentsModeRoute}`);
      return this.client.send<any>(payModeUpdateTp, { id, body });
    } catch (e) {
      this.logger.error(
        `Error al actualizar registro de ${generalPaymentsModeRoute}`,
      );
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado y actualizado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Observable<any> {
    try {
      this.logger.log(`Eliminando registro de ${generalPaymentsModeRoute}`);
      return this.client.send<any>(payModeDeleteTp, id);
    } catch (e) {
      this.logger.error(
        `Error al eliminar registro de ${generalPaymentsModeRoute}`,
      );
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number): Observable<any> {
    try {
      this.logger.log(`Obteniendo un registro de ${generalPaymentsModeRoute}`);
      return this.client.send<any>(payModeGetByIdTp, id);
    } catch (e) {
      this.logger.error(
        `Error al obtener un registro de ${generalPaymentsModeRoute} `,
      );
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  getAll(): Observable<any> {
    try {
      this.logger.log(
        `Obteniendo todos los registros de ${generalPaymentsModeRoute}`,
      );
      return this.client.send<any>(payModeGetAllTp, {});
    } catch (e) {
      this.logger.error(
        `Error al obtener registros de ${generalPaymentsModeRoute}`,
      );
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
