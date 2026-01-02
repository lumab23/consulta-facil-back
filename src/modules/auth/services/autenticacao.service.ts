import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/database/entities/user.entity";
import { Repository } from "typeorm";
import { AuthInput } from "../dto/inputs/autenticacao.input";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly advogadoRepo: Repository<User>,
        private readonly jwtProvider: JwtService
    ) {}

    async autenticar(credenciais: AuthInput) {
        const advogado = await this.advogadoRepo.findOne({
            where: { email: credenciais.email }
        });

        if (!advogado) {
            throw new NotFoundException("Utilizador não encontrado no sistema jurídico.");
        }
        
        const validaSenha = await bcrypt.compare(credenciais.password, advogado.password);

        if (!validaSenha) {
            throw new UnauthorizedException("Credenciais inválidas, por favor tente novamente.");
        }

        const { password, salt, ...perfil } = advogado;

        const jwtPayload = {
            uid: advogado.id,
            advogado: perfil
        };

        return {
            token: await this.jwtProvider.signAsync(jwtPayload), 
            perfil
        };
    }

    async verificarToken(tokenAcesso: string) {
        try {
            const dadosToken = await this.jwtProvider.verifyAsync(tokenAcesso);
            
            if (dadosToken && dadosToken.advogado) {
                return {
                    statusCode: 200,
                    dados: dadosToken.advogado
                };
            }

            throw new UnauthorizedException('Assinatura de token inválida');
        } catch (error) {
            throw new UnauthorizedException('A sua sessão expirou ou o token é inválido');
        }
    }
}