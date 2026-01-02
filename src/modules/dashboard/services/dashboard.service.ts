import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, IsNull, MoreThanOrEqual } from 'typeorm';
import { Processo } from '../../processos/entities/processo.entity';
import { Audiencia } from '../../audiencia/entities/audiencia.entity';
import { ProcessoStatus } from '../../processos/enums/processo-status.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
  ) {}

  async getOverview(user_id: number) {
    const hoje = new Date();
    const seteDiasDepois = new Date();
    seteDiasDepois.setDate(hoje.getDate() + 7);

    const activeCases = await this.processoRepository.count({
      where: { user_id, status: ProcessoStatus.EM_ANDAMENTO, deleted_at: IsNull() },
    });

    const hearingsNext7DaysCount = await this.audienciaRepository.count({
      where: {
        processo: { user_id }, 
        data: Between(hoje, seteDiasDepois),
        deleted_at: IsNull(),
      },
    });

    const upcomingHearings = await this.audienciaRepository.find({
      where: {
        processo: { user_id },
        data: MoreThanOrEqual(hoje),
        deleted_at: IsNull(),
      },
      relations: ['processo'],
      order: { data: 'ASC' },
      take: 5,
    });

    const recentCases = await this.processoRepository.find({
      where: { user_id, deleted_at: IsNull() },
      order: { lastUpdateAt: 'DESC' },
      take: 5,
    });

    return {
      counts: {
        activeCases,
        hearingsNext7Days: hearingsNext7DaysCount,
      },
      upcomingHearings,
      recentCases,
    };
  }
}