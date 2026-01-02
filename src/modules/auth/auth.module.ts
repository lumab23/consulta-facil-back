import { Module } from '@nestjs/common';
import { AuthService } from './services/autenticacao.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/modules/database/entities/user.entity';
import { SignUpService } from './services/registro.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '8h' },
        }),
        }),
    ],
    providers: [
        AuthService,
        SignUpService,
        JwtStrategy
    ],
    controllers: [
        AuthController
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}