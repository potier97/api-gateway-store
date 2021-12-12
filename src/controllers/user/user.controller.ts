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
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  createUserTp,
  updateUserTp,
  deleteUserTp,
  getUserByIdTp,
  getAllUsersTp,
  generalUserRoute,
} from '@configdata/path';
import config from '@configdata/env-config';
import { ApiKeyGuard } from '@guards/api-key.guard';
import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
import { ValidateJWTGuard } from '@guards/validate-jwt.guard';

@UseGuards(ApiKeyGuard, ValidateJWTGuard)
@Controller(generalUserRoute)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(@Inject(config().broker.name) private client: ClientProxy) {}

  @Post()
  create(@Body() body: CreateUserDto): Observable<any> {
    try {
      this.logger.log(`Creando registro de ${generalUserRoute}`);
      return this.client.send<any>(createUserTp, body);
    } catch (e) {
      this.logger.error(`Error al crear registro de ${generalUserRoute}`);
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
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Observable<any> {
    try {
      this.logger.log(`Actualizando registro de ${generalUserRoute}`);
      return this.client.send<any>(updateUserTp, { id, body });
    } catch (e) {
      this.logger.error(`Error al actualizar registro de ${generalUserRoute}`);
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
  delete(@Param('id') id: string): Observable<any> {
    try {
      this.logger.log(`Eliminando registro de ${generalUserRoute}`);
      return this.client.send<any>(deleteUserTp, id);
    } catch (e) {
      this.logger.error(`Error al eliminar registro de ${generalUserRoute}`);
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
  getById(@Param('id') id: string): Observable<any> {
    try {
      this.logger.log(`Obteniendo un registro de ${generalUserRoute}`);
      return this.client.send<any>(getUserByIdTp, id);
    } catch (e) {
      this.logger.error(`Error al obtener un registro de ${generalUserRoute} `);
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
      this.logger.log(`Obteniendo todos los registros de ${generalUserRoute}`);
      return this.client.send<any>(getAllUsersTp, {});
    } catch (e) {
      this.logger.error(`Error al obtener registros de ${generalUserRoute}`);
      this.logger.error(`Error -> ${e} `);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontradoS',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
