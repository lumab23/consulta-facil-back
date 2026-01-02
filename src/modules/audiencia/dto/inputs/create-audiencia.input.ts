import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateAudienciaInput {
  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsNumber()
  case_id: number;

  createdBy: string;
}