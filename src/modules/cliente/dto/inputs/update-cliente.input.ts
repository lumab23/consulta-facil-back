import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateClienteInput {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  documento?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  updatedBy?: string;
}