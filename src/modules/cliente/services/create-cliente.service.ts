import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteInput } from '../dto/inputs/create-cliente.input';

@Injectable()
export class ClienteCreateService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async createCliente(
    id: number,
    createClienteInput: CreateClienteInput
  ): Promise<Cliente> {
    
    const novoCliente = this.clienteRepository.create({
      ...createClienteInput,
      user_id: id, 
      created_by: String(id), 
    });

    return this.clienteRepository.save(novoCliente);
  }
}