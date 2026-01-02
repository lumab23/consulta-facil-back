import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from '../entities/processo.entity';
import { ProcessoFindService } from './find-processo.service';

@Injectable()
export class ProcessoRemoveService {
  constructor(
    @InjectRepository(Processo)
    private processoRepository: Repository<Processo>,
    private readonly processoFindService: ProcessoFindService,
  ) {}

  async removeProcesso(
    user_id: number,
    id: number,
  ): Promise<{ deleted: true }> {
    await this.processoFindService.findOne(user_id, id);

    await this.processoRepository.softDelete(id);

    await this.processoRepository.update(id, {
      deleted_by: String(user_id),
    });

    return { deleted: true };
  }
}
