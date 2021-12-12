import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDate,
  ValidateNested,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FacturasDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Cliente del la factura' })
  public readonly cliente: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id del modo del pago registrado' })
  public readonly modoPago: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ description: 'Total de la compra' })
  public readonly total: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ description: 'Subtotal de la compra' })
  public readonly subtotal: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Fecha de la compra' })
  public readonly fecha: Date;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ description: 'Iva de la compra' })
  public readonly iva: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado del dato' })
  public readonly estado: number;

  @Type(() => DetallesCompraDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @ApiProperty({ description: 'Detalle de la compra registrada' })
  public readonly details: DetallesCompraDto[];
}

export class UpdateFacturasDto extends PartialType(FacturasDto) {}

export class DetallesCompraDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly cantidad: number;
}
