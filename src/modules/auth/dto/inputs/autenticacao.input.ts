import { IsNotEmpty, IsString } from "class-validator";

export class AuthInput {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}