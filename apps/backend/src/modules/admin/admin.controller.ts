import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminMetricsResponseDto } from './dto/admin-metrics-response.dto';
import { AdminRecentResponsesResponseDto } from './dto/admin-recent-responses.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  async getMetrics(): Promise<AdminMetricsResponseDto> {
    return this.adminService.getMetrics();
  }

  @Get('recent-responses')
  async getRecentResponses(): Promise<AdminRecentResponsesResponseDto> {
    return this.adminService.getRecentResponses();
  }
}
