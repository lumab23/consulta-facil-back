import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audiencia } from '../entities/audiencia.entity';
import type { CreateAudienciaInput } from '../dto/inputs/create-audiencia.input';
import { ProcessoFindService } from 'src/modules/processos/services/find-processo.service';

@Injectable()
export class AudienciaCreateService {
  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
    private readonly processoFindService: ProcessoFindService,
  ) {}

  async createAudiencia(
    user_id: number,
    createAudienciaInput: CreateAudienciaInput,
  ): Promise<Audiencia> {
    
    await this.processoFindService
      .findOne(user_id, createAudienciaInput.case_id)
      .catch(() => {
        throw new BadRequestException('O processo especificado não existe ou não pertence a este advogado.');
      });

    const novaAudiencia = this.audienciaRepository.create({
        ...createAudienciaInput,
        created_by: String(user_id),
        case_id: createAudienciaInput.case_id
    });

    return this.audienciaRepository.save(novaAudiencia);
  }
}