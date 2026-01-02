import { IsOptional, IsString, IsNumberString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ClienteQueryDto {
  @ApiPropertyOptional({
    description: 'Termo de busca (nome, documento, email).',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Página atual (default: 1).',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Itens por página (default: 10).',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit: number = 10;
}