import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/autenticacao.service";
import { AuthDto } from "../dto/types/autenticacao.dto";
import { Public } from "../decorators/public.decorator";
import { SignUpDto } from "../dto/types/registro.dto";
import { SignUpService } from "../services/registro.service";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly signUpService: SignUpService
    ) {}

    @Public()
    @Post("/login")
    @ApiOperation({
        summary: 'Autentica usuário',
        description: 'Realiza a autenticação de um usuário com email e senha, retornando um token JWT.'
    })
    @ApiResponse({ status: 200, description: 'Autenticação foi realizada com sucesso.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    @ApiBody({ type: AuthDto })
    @HttpCode(HttpStatus.OK)
    async auth(
        @Body() authDto: AuthDto
    ) {
        const authInput = {
            ...authDto
        }

        return await this.authService.autenticar(authInput);
    }

    @Public()
    @Post('/signUp')
    @ApiOperation({
        summary: 'Cadastrar usuário',
        description: 'Realiza o cadastro de um novo usuário no sistema.',
    })
    @ApiResponse({ status: 201, description: "Usuário cadastrado com sucesso." })
    @ApiResponse({ status: 400, description: "Dados de entrada inválidos (ex: email ou senha ausentes)." })
    @ApiResponse({ status: 409, description: "Já existe um usuário cadastrado com este e-mail." })
    @ApiBody({ type: SignUpDto })
    @HttpCode(HttpStatus.CREATED)
    async signUp(
        @Body() signUpDto: SignUpDto
    ) {
        const signUpInput = {
            ...signUpDto,
            created_by: signUpDto.email
        }

        return await this.signUpService.signUp(signUpInput)
    }
}