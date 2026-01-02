import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProcessoModule } from './modules/processos/processos.module';
import { AudienciaModule } from './modules/audiencia/audiencia.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtAuthGuard } from './modules/auth/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, DatabaseModule, ClienteModule, ProcessoModule, AudienciaModule, DashboardModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
