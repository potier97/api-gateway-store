import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ClientesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del cliente' })
  public readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Apellidos del cliente' })
  public readonly apellido: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Documento de identificación del cliente' })
  public readonly cedula: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Número del teléfono del cliente' })
  public readonly telefono: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Dirección de correo del usuario' })
  public readonly correo: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado del dato' })
  public readonly estado: number;
}

export class UpdateClientesDto extends PartialType(ClientesDto) {}
