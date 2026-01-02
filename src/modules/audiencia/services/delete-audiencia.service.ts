import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audiencia } from '../entities/audiencia.entity';
import { AudienciaFindService } from './find-audiencia.service';

@Injectable()
export class AudienciaRemoveService {
  constructor(
    @InjectRepository(Audiencia)
    private audienciaRepository: Repository<Audiencia>,
    private readonly audienciaFindService: AudienciaFindService,
  ) {}

  async removeAudiencia(
    user_id: number, 
    id: number
  ): Promise<{ deleted: true }> {
    
    await this.audienciaFindService.findOne(user_id, id); 

    await this.audienciaRepository.softDelete(id);
    
    await this.audienciaRepository.update(id, {
        deleted_by: String(user_id),
    });

    return { deleted: true };
  }
}