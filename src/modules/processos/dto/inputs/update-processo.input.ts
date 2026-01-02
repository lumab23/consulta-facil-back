import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
} from 'class-validator';
import { ProcessoStatus } from '../../enums/processo-status.enum';

export class UpdateProcessoInput {
  @IsOptional()
  @IsString()
  numeroProcesso?: string;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  forum?: string;

  @IsOptional()
  @IsEnum(ProcessoStatus)
  status?: ProcessoStatus;

  @IsOptional()
  @IsNumber()
  client_id?: number;

  @IsOptional()
  @IsDate()
  lastUpdateAt?: Date;

  updatedBy?: string;
}
