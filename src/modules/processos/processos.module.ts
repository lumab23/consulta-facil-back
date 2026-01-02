import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processo } from './entities/processo.entity';
import { ProcessoCreateService } from './services/create-processo.service';
import { ProcessoFindService } from './services/find-processo.service';
import { ProcessoUpdateService } from './services/update-processo.service';
import { ProcessoRemoveService } from './services/delete-processo.service';
import { ClienteModule } from '../cliente/cliente.module';
import { ProcessoController } from './controllers/processo-controller';

@Module({
  imports: [TypeOrmModule.forFeature([Processo]), ClienteModule],
  controllers: [ProcessoController],
  providers: [
    ProcessoCreateService,
    ProcessoFindService,
    ProcessoUpdateService,
    ProcessoRemoveService,
  ],
  exports: [
    ProcessoCreateService,
    ProcessoFindService,
    ProcessoUpdateService,
    ProcessoRemoveService,
  ],
})
export class ProcessoModule {}
