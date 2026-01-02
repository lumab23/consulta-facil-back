import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { Processo } from '../processos/entities/processo.entity';
import { Audiencia } from '../audiencia/entities/audiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Processo, Audiencia])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}