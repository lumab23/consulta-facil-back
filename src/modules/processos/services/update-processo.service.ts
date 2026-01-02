import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from '../entities/processo.entity';
import type { UpdateProcessoInput } from '../dto/inputs/update-processo.input';
import { ProcessoFindService } from './find-processo.service';
import { ClienteFindService } from 'src/modules/cliente/services/find-cliente.service';

@Injectable()
export class ProcessoUpdateService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
    private readonly processoFindService: ProcessoFindService,
    private readonly clienteFindService: ClienteFindService,
  ) {}

  async update(
    user_id: number,
    id: number,
    updateProcessoInput: UpdateProcessoInput,
  ): Promise<Processo> {
    const processo = await this.processoFindService.findOne(user_id, id);

    if (
      updateProcessoInput.client_id &&
      updateProcessoInput.client_id !== processo.client_id
    ) {
      await this.clienteFindService
        .findOne(user_id, updateProcessoInput.client_id)
        .catch(() => {
          throw new BadRequestException(
            'O novo cliente especificado não existe ou não pertence a este advogado.',
          );
        });
    }

    const updateData: Partial<Processo> = {
      ...updateProcessoInput,
      updated_by: String(user_id),
      updated_at: new Date(),
      lastUpdateAt: updateProcessoInput.lastUpdateAt ?? new Date(),
    };

    const updatedProcesso = this.processoRepository.merge(processo, updateData);

    return this.processoRepository.save(updatedProcesso);
  }
}
