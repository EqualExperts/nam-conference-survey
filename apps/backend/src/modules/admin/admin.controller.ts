import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminMetricsResponseDto } from './dto/admin-metrics-response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  async getMetrics(): Promise<AdminMetricsResponseDto> {
    return this.adminService.getMetrics();
  }
}
