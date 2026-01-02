import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProcessoDto } from './create-processo.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateProcessoDto extends PartialType(CreateProcessoDto) {
  @ApiProperty({
    description:
      'Data da última movimentação (atualiza automaticamente no PATCH)',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  lastUpdateAt?: Date;
}
