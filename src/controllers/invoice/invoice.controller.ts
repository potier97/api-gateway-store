import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  invoiceDeleteTp,
  invoiceGetByIdTp,
  invoiceGetAllTp,
  generalInvoiceRoute,
} from '@configdata/path';
import config from '@configdata/env-config';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalInvoiceRoute)
export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Observable<any> {
    try {
      this.logger.log(`Eliminando registro de ${generalInvoiceRoute}`);
      return this.client.send<any>(invoiceDeleteTp, id);
    } catch (e) {
      this.logger.error(`Error al eliminar registro de ${generalInvoiceRoute}`);
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
      this.logger.log(`Obteniendo un registro de ${generalInvoiceRoute}`);
      return this.client.send<any>(invoiceGetByIdTp, id);
    } catch (e) {
      this.logger.error(
        `Error al obtener un registro de ${generalInvoiceRoute} `,
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
        `Obteniendo todos los registros de ${generalInvoiceRoute}`,
      );
      return this.client.send<any>(invoiceGetAllTp, {});
    } catch (e) {
      this.logger.error(`Error al obtener registros de ${generalInvoiceRoute}`);
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
