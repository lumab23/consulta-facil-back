import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateAudienciaInput {
  @IsOptional()
  @IsDateString()
  data?: Date;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  updatedBy?: string;
}