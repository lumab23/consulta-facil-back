import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { UpdateClienteInput } from '../dto/inputs/update-cliente.input';
import { ClienteFindService } from './find-cliente.service';

@Injectable()
export class ClienteUpdateService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private readonly clienteFindService: ClienteFindService,
  ) {}

  async update(
    user_id: number,
    id: number,
    updateClienteInput: UpdateClienteInput,
  ): Promise<Cliente> {
    const cliente = await this.clienteFindService.findOne(user_id, id); 

    const updatedCliente = this.clienteRepository.merge(cliente, {
      ...updateClienteInput,
      updated_by: String(user_id),
      updated_at: new Date(),
    });

    return this.clienteRepository.save(updatedCliente);
  }
}