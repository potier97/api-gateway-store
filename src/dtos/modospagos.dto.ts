import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ModosPagosDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tipo de pago' })
  public readonly tipo: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado del dato' })
  public readonly estado: number;
}

export class UpdatModosPagosDto extends PartialType(ModosPagosDto) {}
