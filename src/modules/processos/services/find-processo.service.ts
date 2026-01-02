import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Processo } from '../entities/processo.entity';
import { ProcessoQueryDto } from '../dto/types/processo-query.dto';

@Injectable()
export class ProcessoFindService {
  constructor(
    @InjectRepository(Processo)
    private readonly repo: Repository<Processo>,
  ) {}

  async findAll(user_id: number, query: ProcessoQueryDto) {
    const { search, page, limit, status, client_id } = query;
    
    const queryBuilder = this.repo.createQueryBuilder('processo')
      .leftJoinAndSelect('processo.cliente', 'cliente')
      .where('processo.user_id = :user_id', { user_id })
      .andWhere('processo.deleted_at IS NULL');

    if (status) {
      queryBuilder.andWhere('processo.status = :status', { status });
    }

    if (client_id) {
      queryBuilder.andWhere('processo.client_id = :client_id', { client_id });
    }

    if (search) {
      queryBuilder.andWhere(
        '(processo.numero_processo ILIKE :search OR processo.titulo ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    const [data, total] = await queryBuilder
      .orderBy('processo.lastUpdateAt', 'DESC')
      .addOrderBy('processo.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { 
      data, 
      total, 
      page: +page, 
      limit: +limit 
    };
  }

  async findOne(user_id: number, id: number): Promise<Processo> {
    const processo = await this.repo.findOne({
      where: { 
        id, 
        user_id, 
        deleted_at: IsNull() 
      },
      relations: ['cliente'],
    });

    if (!processo) {
      throw new NotFoundException(`Processo com ID ${id} não encontrado.`);
    }

    return processo;
  }
}