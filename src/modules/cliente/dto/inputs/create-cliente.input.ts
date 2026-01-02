import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClienteInput {
  @IsString()
  @IsNotEmpty()
  nome: string;

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

  createdBy: string;

}