import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {

    const segredo = configService.get<string>("JWT_SECRET");

    if (!segredo) {
      throw new Error('JWT_SECRET não encontrada nas variáveis de ambiente!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: segredo, 
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload recebido:', JSON.stringify(payload, null, 2));

    const userId = payload.uid || payload.sub || payload.id || payload.userId;

    if (!userId) {
      console.error('Erro: ID do usuário não encontrado no payload');
      throw new UnauthorizedException('Token inválido: ID do usuário não encontrado no payload');
    }

    const numericId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

    if (isNaN(numericId)) {
      console.error('Erro: ID do usuário não é um número válido:', userId);
      throw new UnauthorizedException('Token inválido: ID do usuário inválido');
    }

    const user = { 
      id: numericId,
      email: payload.email || payload.advogado?.email || null,
      nome: payload.nome || payload.advogado?.nome || null,
    };

    console.log('Usuário validado:', user);
    
    return user;
  } 
}