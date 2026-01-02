import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, IsNull } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { ClienteQueryDto } from '../dto/types/cliente-query.dto';

@Injectable()
export class ClienteFindService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(user_id: number, query: ClienteQueryDto) {
    const { search, page, limit } = query;
    const take = limit;
    const skip = (page - 1) * take;

    const baseCondition: FindOptionsWhere<Cliente> = { 
        user_id, 
        deleted_at: IsNull() 
    };

    let where: FindOptionsWhere<Cliente>[] = [baseCondition];

    if (search) {
      where = [
        { ...baseCondition, nome: Like(`%${search}%`) },
        { ...baseCondition, documento: Like(`%${search}%`) },
        { ...baseCondition, email: Like(`%${search}%`) },
      ];
    } else {
        where = [baseCondition];
    }

    const [data, total] = await this.clienteRepository.findAndCount({
      where: where,
      take: take,
      skip: skip,
      order: { nome: 'ASC' },
    });

    return {
      data,
      total,
      page: +page,
      limit: +limit,
    };
  }

  async findOne(user_id: number, id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { user_id, id, deleted_at: IsNull() },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }
}