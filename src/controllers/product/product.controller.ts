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
  productCreateTp,
  productUpdateTp,
  productDeleteTp,
  productGetByIdTp,
  productGetAllTp,
  generalProductsRoute,
} from '@configdata/path';
import config from '@configdata/env-config';
import { ProductosDto, UpdateProductosDto } from '@dtos/productos.dto';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalProductsRoute)
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  create(@Body() body: ProductosDto): Observable<any> {
    try {
      this.logger.log(`Creando registro de ${generalProductsRoute}`);
      return this.client.send<any>(productCreateTp, body);
    } catch (e) {
      this.logger.error(`Error al crear registro de ${generalProductsRoute}`);
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
    @Body() body: UpdateProductosDto,
  ): Observable<any> {
    try {
      this.logger.log(`Actualizando registro de ${generalProductsRoute}`);
      return this.client.send<any>(productUpdateTp, { id, body });
    } catch (e) {
      this.logger.error(
        `Error al actualizar registro de ${generalProductsRoute}`,
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
      this.logger.log(`Eliminando registro de ${generalProductsRoute}`);
      return this.client.send<any>(productDeleteTp, id);
    } catch (e) {
      this.logger.error(
        `Error al eliminar registro de ${generalProductsRoute}`,
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
      this.logger.log(`Obteniendo un registro de ${generalProductsRoute}`);
      return this.client.send<any>(productGetByIdTp, id);
    } catch (e) {
      this.logger.error(
        `Error al obtener un registro de ${generalProductsRoute} `,
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
        `Obteniendo todos los registros de ${generalProductsRoute}`,
      );
      return this.client.send<any>(productGetAllTp, {});
    } catch (e) {
      this.logger.error(
        `Error al obtener registros de ${generalProductsRoute}`,
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
