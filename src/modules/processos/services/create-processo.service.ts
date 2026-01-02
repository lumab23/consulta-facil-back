import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from '../entities/processo.entity';
import type { CreateProcessoInput } from '../dto/inputs/create-processo.input';
import { ClienteFindService } from 'src/modules/cliente/services/find-cliente.service';

@Injectable()
export class ProcessoCreateService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
    private readonly clienteFindService: ClienteFindService,
  ) {}

  async createProcesso(
    user_id: number,
    createProcessoInput: CreateProcessoInput,
  ): Promise<Processo> {
    await this.clienteFindService
      .findOne(user_id, createProcessoInput.client_id)
      .catch(() => {
        throw new BadRequestException(
          'O cliente especificado não existe ou não pertence a este advogado.',
        );
      });

    const novoProcesso = this.processoRepository.create({
      ...createProcessoInput,
      user_id: user_id,
      created_by: String(user_id),
      lastUpdateAt: new Date(),
    });

    return this.processoRepository.save(novoProcesso);
  }
}
