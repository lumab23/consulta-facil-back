import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '12345?!', 
    });
  }

  async validate(payload: any) {
    // LOG DE DEBUG: Verifique no terminal do Docker o que aparece aqui
    console.log('JWT Payload recebido:', payload);

    // Tenta pegar o ID de várias formas comuns para evitar o 401
    const userId = payload.uid || payload.sub || payload.id;

    if (!userId) {
      throw new UnauthorizedException('Token inválido: ID do usuário não encontrado no payload');
    }

    // Retorna o objeto que o NestJS injeta no req.user
    return { 
      id: userId,        
      email: payload.advogado?.email || payload.email, 
      nome: payload.advogado?.nome || payload.nome 
    };
  } 
}