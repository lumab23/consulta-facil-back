import { Module } from '@nestjs/common';
import { ClienteController } from '../cliente/controllers/cliente.controller';
import { ClienteCreateService } from './services/create-cliente.service';
import { ClienteFindService } from './services/find-cliente.service';
import { ClienteUpdateService } from './services/update-cliente.service';
import { ClienteRemoveService } from './services/remove-cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente])
  ],
  controllers: [ClienteController],
  providers: [
    ClienteCreateService,
    ClienteFindService,
    ClienteUpdateService,
    ClienteRemoveService
  ],
  exports: [
    ClienteCreateService,
    ClienteFindService,
    ClienteUpdateService,
    ClienteRemoveService
  ]
})
export class ClienteModule {}
