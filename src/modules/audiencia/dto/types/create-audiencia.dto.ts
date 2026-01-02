import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAudienciaDto {
  @ApiProperty({ 
    description: 'Data e hora da audiência (ISO 8601)', 
    type: String, format: 'date-time' 
  })
  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @ApiProperty({ 
    description: 'Local (ex: 2ª Vara Cível) ou link da reunião', 
    required: false 
  })
  @IsOptional()
  @IsString()
  local?: string;

  @ApiProperty({ 
    description: 'Notas ou resumo para a audiência', 
    required: false 
  })
  @IsOptional()
  @IsString()
  notas?: string;

  @ApiProperty({ 
    description: 'ID do Processo vinculado', 
    type: Number, minimum: 1 
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  case_id: number; 
}