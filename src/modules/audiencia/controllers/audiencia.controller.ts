import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import type { RequestWithUser } from '../../auth/interfaces/requestWithUser';
import type { Audiencia } from '../entities/audiencia.entity';
import { CreateAudienciaDto } from '../dto/types/create-audiencia.dto';
import { UpdateAudienciaDto } from '../dto/types/update-audiencia.dto';
import { AudienciaQueryDto } from '../dto/types/audiencia-query.dto';
import { CreateAudienciaInput } from '../dto/inputs/create-audiencia.input';
import { UpdateAudienciaInput } from '../dto/inputs/update-audiencia.input';
import { AudienciaCreateService } from '../services/create-audiencia.service';
import { AudienciaFindService } from '../services/find-audiencia.service';
import { AudienciaUpdateService } from '../services/update-audiencia.service';
import { AudienciaRemoveService } from '../services/delete-audiencia.service';

@ApiBearerAuth()
@ApiTags('Audiências')
@Controller() 
export class AudienciaController {
  constructor(
    private readonly audienciaCreateService: AudienciaCreateService,
    private readonly audienciaFindService: AudienciaFindService,
    private readonly audienciaUpdateService: AudienciaUpdateService,
    private readonly audienciaRemoveService: AudienciaRemoveService,
  ) {}

  private getUserId(req: RequestWithUser): number {
    return req.user.id;
  }

  @Post('processos/:caseId/audiencias')
  @ApiOperation({ 
    summary: 'Cria uma nova audiência para um processo específico' 
  })
  @ApiBody({type: CreateAudienciaDto})
  @ApiParam({ name: 'caseId', description: 'ID do Processo', type: Number })
  @ApiResponse({ 
    status: 201, 
    description: 'Audiência criada com sucesso.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: RequestWithUser, 
    @Param('caseId', ParseIntPipe) caseId: number,
    @Body() audienciaDto: CreateAudienciaDto,
  ): Promise<Audiencia> {
    
    if (caseId !== audienciaDto.case_id) {
        throw new BadRequestException('O ID do processo na URL não corresponde ao body da requisição.');
    }
    
    const user_id = this.getUserId(req);
    const createAudienciaInput: CreateAudienciaInput = {
        data: audienciaDto.data,
        local: audienciaDto.local,
        notas: audienciaDto.notas,
        case_id: caseId,
        createdBy: String(user_id)
    }

    return await this.audienciaCreateService.createAudiencia(user_id, createAudienciaInput);
  }

  @Get('processos/:caseId/audiencias')
  @ApiOperation({ 
    summary: 'Lista audiências de um processo específico com filtro de datas' 
  })
  @ApiParam({ 
    name: 'caseId', 
    description: 'ID do Processo', 
    type: Number 
  })
  @ApiQuery({ 
    name: 'from', 
    required: false, 
    description: 'Data de início (ISO 8601)' 
  })
  @ApiQuery({ 
    name: 'to', 
    required: false, 
    description: 'Data de fim (ISO 8601)' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de audiências retornada.' 
  })
  @HttpCode(HttpStatus.OK)
  async findAllByCaseId(
    @Req() req: RequestWithUser, 
    @Param('caseId', ParseIntPipe) caseId: number,
    @Query() query: AudienciaQueryDto,
  ): Promise<Audiencia[]> {
    const user_id = this.getUserId(req);
    return this.audienciaFindService.findAllByCaseId(user_id, caseId, query);
  }

  @Patch('audiencias/:id')
  @ApiOperation({ 
    summary: 'Atualiza dados de uma audiência' 
  })
  @ApiBody({ type: UpdateAudienciaDto})
  @ApiParam({ 
    name: 'id', 
    description: 'ID da Audiência', 
    type: Number 
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAudienciaDto: UpdateAudienciaDto,
  ): Promise<Audiencia> {
    const user_id = this.getUserId(req);
    const updateAudienciaInput: UpdateAudienciaInput = {
        data: updateAudienciaDto.data,
        local: updateAudienciaDto.local,
        notas: updateAudienciaDto.notas,
        updatedBy: String(user_id)
    }
    return await this.audienciaUpdateService.update(user_id, id, updateAudienciaInput);
  }

  @Get('audiencias/:id')
  @ApiOperation({ 
    summary: 'Busca uma audiência específica por ID' 
  
  })
  @ApiParam({ name: 'id', 
    description: 'ID da Audiência', 
    type: Number 
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    const user_id = this.getUserId(req);
    return this.audienciaFindService.findOne(user_id, id);
  }
  
  @Delete('audiencias/:id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  @ApiOperation({ 
    summary: 'Remove (soft delete) uma audiência' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID da Audiência', 
    type: Number 
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Audiência removida com sucesso.' 
  })
  async remove(
    @Req() req: RequestWithUser, 
    @Param('id', ParseIntPipe) id: number
  ): Promise<void>  {
    const user_id = this.getUserId(req);
    await this.audienciaRemoveService.removeAudiencia(user_id, id);
  }
}