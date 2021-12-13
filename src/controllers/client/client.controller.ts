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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  clientCreateTp,
  clientUpdateTp,
  clientDeleteTp,
  clientGetByIdTp,
  clientGetAllTp,
  generalClientRoute,
} from '@configdata/path';
import config from '@configdata/env-config';
import { ClientesDto, UpdateClientesDto } from '@dtos/clientes.dto';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalClientRoute)
export class ClientController {
  private readonly logger = new Logger(ClientController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  async create(@Body() body: ClientesDto): Promise<any> {
    try {
      this.logger.log(`Creando registro de ${generalClientRoute}`);
      return this.client.send<any>(clientCreateTp, body).toPromise();
    } catch (e) {
      this.logger.error(`Error al crear registro de ${generalClientRoute}`);
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
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateClientesDto,
  ): Promise<any> {
    try {
      this.logger.log(`Actualizando registro de ${generalClientRoute}`);
      return this.client.send<any>(clientUpdateTp, { id, body }).toPromise();
    } catch (e) {
      this.logger.error(
        `Error al actualizar registro de ${generalClientRoute}`,
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
  async delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    try {
      this.logger.log(`Eliminando registro de ${generalClientRoute}`);
      return this.client.send<any>(clientDeleteTp, id).toPromise();
    } catch (e) {
      this.logger.error(`Error al eliminar registro de ${generalClientRoute}`);
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
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    try {
      this.logger.log(`Obteniendo un registro de ${generalClientRoute}`);
      return this.client.send<any>(clientGetByIdTp, id).toPromise();
    } catch (e) {
      this.logger.error(
        `Error al obtener un registro de ${generalClientRoute} `,
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
  async getAll(): Promise<any> {
    try {
      this.logger.log(
        `Obteniendo todos los registros de ${generalClientRoute}`,
      );
      return this.client.send(clientGetAllTp, {}).toPromise();
    } catch (e) {
      this.logger.error(`Error al obtener registros de ${generalClientRoute}`);
      this.logger.error(`Error -> ${e} `);

      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'No encontrado',
        content: false,
      });
    }
  }
}
