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
import { CreateClienteInput } from '../dto/inputs/create-cliente.input';
import { UpdateClienteInput } from '../dto/inputs/update-cliente.input';
import { CreateClienteDto } from '../dto/types/create-cliente.dto';
import { UpdateClienteDto } from '../dto/types/update-cliente.dto';
import { ClienteQueryDto } from '../dto/types/cliente-query.dto';
import { ClienteCreateService } from '../services/create-cliente.service';
import { ClienteFindService } from '../services/find-cliente.service';
import { ClienteUpdateService } from '../services/update-cliente.service';
import { ClienteRemoveService } from '../services/remove-cliente.service';
import type { RequestWithUser } from '../../auth/interfaces/requestWithUser';
import type { Cliente } from '../entities/cliente.entity';

@ApiBearerAuth()
@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteCreateService: ClienteCreateService,
    private readonly clienteFindService: ClienteFindService,
    private readonly clienteUpdateService: ClienteUpdateService,
    private readonly clienteRemoveService: ClienteRemoveService,
  ) {}

  private getUserId(req: RequestWithUser): number {
    console.log('req.user completo:', req.user);
    
    if (!req.user || !req.user.id) {
      throw new Error('Usuário não autenticado ou ID não encontrado');
    }
    
    const id = typeof req.user.id === 'string' 
      ? parseInt(req.user.id, 10) 
      : req.user.id;
    
    console.log('User ID extraído:', id);
    return id;
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo cliente para o advogado autenticado',
  })
  @ApiBody({ type: CreateClienteDto })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: RequestWithUser,
    @Body() clienteDto: CreateClienteDto,
  ): Promise<Cliente> {
    const user_id = this.getUserId(req);

    const createClienteInput: CreateClienteInput = {
      nome: clienteDto.nome,
      documento: clienteDto.documento,
      email: clienteDto.email,
      telefone: clienteDto.telefone,
      observacoes: clienteDto.observacoes,
      createdBy: String(user_id),
    };

    return await this.clienteCreateService.createCliente(
      user_id,
      createClienteInput,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Lista clientes do advogado, com busca e paginação',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Termo de busca (nome, documento, email)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Página atual',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Itens por página',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: RequestWithUser, @Query() query: ClienteQueryDto) {
    const user_id = this.getUserId(req);
    return this.clienteFindService.findAll(user_id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente específico por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user_id = this.getUserId(req);
    return this.clienteFindService.findOne(user_id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um cliente' })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente a ser atualizado',
    type: Number,
  })
  @ApiBody({ type: UpdateClienteDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const user_id = this.getUserId(req);

    const updateClienteInput: UpdateClienteInput = {
      nome: updateClienteDto.nome,
      documento: updateClienteDto.documento,
      email: updateClienteDto.email,
      telefone: updateClienteDto.telefone,
      observacoes: updateClienteDto.observacoes,
      updatedBy: String(user_id),
    };
    return await this.clienteUpdateService.update(
      user_id,
      id,
      updateClienteInput,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove (soft delete) um cliente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente a ser removido',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'Cliente removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
  })
  async remove(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const user_id = this.getUserId(req);

    await this.clienteRemoveService.removeCliente(user_id, id);
  }
}