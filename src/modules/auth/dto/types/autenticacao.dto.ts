import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @ApiProperty({
        description: "Email do advogado",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Senha do de acesso ao painel de processos",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}