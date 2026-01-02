import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {

    @ApiProperty({
        description: "Nome do advogado",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        description: "Registro da OAB (Ex: SP123456)",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    registro_oab: string;

    @ApiProperty({
        description: "Email do advogado",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Senha do advogado",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}