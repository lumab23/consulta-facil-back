import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "../entities/cliente.entity";
import { IsNull, Repository } from "typeorm";

@Injectable()
export class ClienteRemoveService { 
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>
    ) {}

    async removeCliente(userId: number, id: number): Promise<void> { 
        const cliente = await this.clienteRepo.findOne({ 
            where: { id, user_id: userId, deleted_at: IsNull() } 
        });

        if (!cliente) throw new NotFoundException('Cliente não encontrado');
        
        await this.clienteRepo.softDelete(id);
        
        await this.clienteRepo.update(id, {
            deleted_by: String(userId)
        });
    }
}