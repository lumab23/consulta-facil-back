import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EhDocumentoValido } from '../../../../common/validators/is-document.validator'; 

export class CreateClienteDto {
  @ApiProperty({ description: 'Nome completo ou razão social do cliente', maxLength: 300 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  nome: string;

  @ApiProperty({ description: 'CPF ou CNPJ (opcional, mas validado se presente)', required: false, maxLength: 20 })
  @IsOptional()
  @IsString()
  @EhDocumentoValido() 
  documento?: string; 

  @ApiProperty({ description: 'Email do cliente', required: false, maxLength: 200 })
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @ApiProperty({ description: 'Telefone do cliente', required: false, maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefone?: string;

  @ApiProperty({ description: 'Observações internas sobre o cliente', required: false })
  @IsOptional()
  @IsString()
  observacoes?: string;
}