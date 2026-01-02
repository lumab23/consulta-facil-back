import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, IsNull, Between } from 'typeorm';
import { Audiencia } from '../entities/audiencia.entity';
import { AudienciaQueryDto } from '../dto/types/audiencia-query.dto';
import { ProcessoFindService } from 'src/modules/processos/services/find-processo.service';

@Injectable()
export class AudienciaFindService {
  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
    private readonly processoFindService: ProcessoFindService,
  ) {}
  
  async findOne(user_id: number, id: number): Promise<Audiencia> {
    const audiencia = await this.audienciaRepository.findOne({
      where: { id, deleted_at: IsNull() },
      relations: ['processo'],
    });
    
    if (!audiencia) {
        throw new NotFoundException(`Audiência com ID ${id} não encontrada.`);
    }

    if (audiencia.processo.user_id !== user_id) {
        throw new NotFoundException(`Audiência com ID ${id} não encontrada.`);
    }

    return audiencia;
  }

  async findAllByCaseId(
    user_id: number, 
    case_id: number, 
    query: AudienciaQueryDto
  ): Promise<Audiencia[]> {
    
    await this.processoFindService
      .findOne(user_id, case_id)
      .catch(() => {
        throw new NotFoundException(`Processo com ID ${case_id} não encontrado.`);
      });

    const where: FindOptionsWhere<Audiencia> = {
      case_id: case_id,
      deleted_at: IsNull(),
    };

    if (query.from && query.to) {
        where.data = Between(new Date(query.from), new Date(query.to));
    }
    
    return this.audienciaRepository.find({
      where,
      order: {
        data: 'ASC',
      },
    });
  }
}