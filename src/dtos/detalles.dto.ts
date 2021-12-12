import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class DetallesDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id de la compra registrada' })
  public readonly idFactura: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id del producto de la compra registrada' })
  public readonly idProducto: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del producto' })
  public readonly nombre: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'cantidad del producto' })
  public readonly cantidad: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'precio del producto' })
  public readonly precio: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado del dato' })
  public readonly estado: number;
}

export class UpdateDetallesDto extends PartialType(DetallesDto) {}
