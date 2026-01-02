import { Controller, Get, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';
import type { RequestWithUser } from '../../auth/interfaces/requestWithUser';

@ApiBearerAuth()
@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Retorna contagens e resumos para o painel inicial' })
  @HttpCode(HttpStatus.OK)
  async getOverview(@Req() req: RequestWithUser) {
    return this.dashboardService.getOverview(req.user.id);
  }
}