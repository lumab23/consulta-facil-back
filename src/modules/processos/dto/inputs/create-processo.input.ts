import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { ProcessoStatus } from '../../enums/processo-status.enum';

export class CreateProcessoInput {
  @IsString()
  @IsNotEmpty()
  numeroProcesso: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  forum?: string;

  @IsEnum(ProcessoStatus)
  status: ProcessoStatus;

  @IsNumber()
  client_id: number;

  createdBy: string;
}
