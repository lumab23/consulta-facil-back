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
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import type { RequestWithUser } from '../../auth/interfaces/requestWithUser';
import type { Processo } from '../entities/processo.entity';
import { CreateProcessoDto } from '../dto/types/create-processo.dto';
import { UpdateProcessoDto } from '../dto/types/update-processo.dto';
import { ProcessoQueryDto } from '../dto/types/processo-query.dto';
import { CreateProcessoInput } from '../dto/inputs/create-processo.input';
import { UpdateProcessoInput } from '../dto/inputs/update-processo.input';
import { ProcessoCreateService } from '../services/create-processo.service';
import { ProcessoFindService } from '../services/find-processo.service';
import { ProcessoUpdateService } from '../services/update-processo.service';
import { ProcessoRemoveService } from '../services/delete-processo.service';
import { ProcessoStatus } from '../enums/processo-status.enum';

@ApiBearerAuth()
@ApiTags('Processos')
@Controller('processos')
export class ProcessoController {
  constructor(
    private readonly processoCreateService: ProcessoCreateService,
    private readonly processoFindService: ProcessoFindService,
    private readonly processoUpdateService: ProcessoUpdateService,
    private readonly processoRemoveService: ProcessoRemoveService,
  ) {}

  private getUserId(req: RequestWithUser): number {
    return req.user.id;
  }

  @Post()
  @ApiOperation({
    summary:
      'Cria um novo processo vinculado a um cliente e ao advogado autenticado',
  })
  @ApiBody({ type: CreateProcessoDto })
  @ApiResponse({ status: 201, description: 'Processo criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Cliente não encontrado ou não pertence ao advogado.',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: RequestWithUser,
    @Body() processoDto: CreateProcessoDto,
  ): Promise<Processo> {
    const user_id = this.getUserId(req);
    const createProcessoInput: CreateProcessoInput = {
      numeroProcesso: processoDto.numeroProcesso,
      titulo: processoDto.titulo,
      forum: processoDto.forum,
      status: processoDto.status,
      client_id: processoDto.client_id,
      createdBy: String(user_id),
    };

    return await this.processoCreateService.createProcesso(
      user_id,
      createProcessoInput,
    );
  }

  @Get()
  @ApiOperation({
    summary:
      'Lista processos do advogado, com filtros por status/cliente e paginação',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ProcessoStatus })
  @ApiQuery({
    name: 'client_id',
    required: false,
    description: 'ID do cliente',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'Lista de processos retornada com sucesso.',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: RequestWithUser, @Query() query: ProcessoQueryDto) {
    const user_id = this.getUserId(req);
    return this.processoFindService.findAll(user_id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um processo específico por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Processo encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Processo não encontrado.' })
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user_id = this.getUserId(req);
    return this.processoFindService.findOne(user_id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um processo' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProcessoDto })
  @ApiResponse({ status: 200, description: 'Processo atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Processo não encontrado.' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessoDto: UpdateProcessoDto,
  ): Promise<Processo> {
    const user_id = this.getUserId(req);
    const updateProcessoInput: UpdateProcessoInput = {
      numeroProcesso: updateProcessoDto.numeroProcesso,
      titulo: updateProcessoDto.titulo,
      forum: updateProcessoDto.forum,
      status: updateProcessoDto.status,
      client_id: updateProcessoDto.client_id,
      lastUpdateAt: updateProcessoDto.lastUpdateAt,
      updatedBy: String(user_id),
    };
    return await this.processoUpdateService.update(
      user_id,
      id,
      updateProcessoInput,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove (soft delete) um processo' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Processo removido com sucesso.' })
  async remove(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const user_id = this.getUserId(req);
    await this.processoRemoveService.removeProcesso(user_id, id);
  }
}
