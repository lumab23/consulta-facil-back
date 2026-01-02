import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audiencia } from '../entities/audiencia.entity';
import type { UpdateAudienciaInput } from '../dto/inputs/update-audiencia.input';
import { AudienciaFindService } from './find-audiencia.service';

@Injectable()
export class AudienciaUpdateService {
  constructor(
    @InjectRepository(Audiencia)
    private readonly audienciaRepository: Repository<Audiencia>,
    private readonly audienciaFindService: AudienciaFindService,
  ) {}

  async update(
    user_id: number,
    id: number,
    updateAudienciaInput: UpdateAudienciaInput,
  ): Promise<Audiencia> {
    const audiencia = await this.audienciaFindService.findOne(user_id, id); 

    const updatedAudiencia = this.audienciaRepository.merge(audiencia, {
      ...updateAudienciaInput,
      updated_by: String(user_id),
      updated_at: new Date(),
    });

    return this.audienciaRepository.save(updatedAudiencia);
  }
}