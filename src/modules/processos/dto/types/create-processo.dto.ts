import { IsNotEmpty, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcessoStatus } from '../../enums/processo-status.enum';

export class CreateProcessoDto {
  @ApiProperty({
    description: 'Número único do processo (CNJ/OAB)',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  numeroProcesso: string;

  @ApiProperty({
    description: 'Título ou assunto do processo',
    maxLength: 300,
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Fórum ou Vara onde o processo corre',
    required: false,
  })
  @IsString()
  forum?: string;

  @ApiProperty({
    description: 'Status atual do processo',
    enum: ProcessoStatus,
    default: ProcessoStatus.PENDENTE,
  })
  @IsEnum(ProcessoStatus)
  status: ProcessoStatus = ProcessoStatus.PENDENTE;

  @ApiProperty({
    description: 'ID do Cliente vinculado',
    type: Number,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  client_id: number;
}
