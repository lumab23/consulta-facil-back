import { IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AudienciaQueryDto {
  @ApiPropertyOptional({
    description: 'Data de início do intervalo (ex: hoje)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'Data de fim do intervalo (ex: daqui a 7 dias)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}