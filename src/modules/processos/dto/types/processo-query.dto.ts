import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProcessoStatus } from '../../enums/processo-status.enum';

const toInt = ({ value }: { value: any }): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const numericValue = parseInt(String(value), 10);
  return isNaN(numericValue) ? undefined : numericValue;
};

export class ProcessoQueryDto {
  @ApiPropertyOptional({
    description: 'Termo de busca (número do processo ou título).',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por Status.',
    enum: ProcessoStatus,
  })
  @IsOptional()
  @IsEnum(ProcessoStatus)
  status?: ProcessoStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por ID do Cliente.',
  })
  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  client_id?: number;

  @ApiPropertyOptional({
    description: 'Página atual (default: 1).',
  })
  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Itens por página (default: 10).',
  })
  @IsOptional()
  @Transform(toInt)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
