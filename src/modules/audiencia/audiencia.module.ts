import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienciaController } from './controllers/audiencia.controller';
import { Audiencia } from './entities/audiencia.entity';
import { AudienciaCreateService } from './services/create-audiencia.service';
import { AudienciaFindService } from './services/find-audiencia.service';
import { AudienciaUpdateService } from './services/update-audiencia.service';
import { AudienciaRemoveService } from './services/delete-audiencia.service';
import { ProcessoModule } from "../processos/processos.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Audiencia]),
    ProcessoModule, 
  ],
  controllers: [AudienciaController],
  providers: [
    AudienciaCreateService,
    AudienciaFindService,
    AudienciaUpdateService,
    AudienciaRemoveService,
  ],
  exports: [
    AudienciaCreateService,
    AudienciaFindService,
    AudienciaUpdateService,
    AudienciaRemoveService,
  ], 
})
export class AudienciaModule {}