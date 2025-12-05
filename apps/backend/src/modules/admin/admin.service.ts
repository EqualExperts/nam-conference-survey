import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminMetricsResponseDto } from './dto/admin-metrics-response.dto';
import { Status } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics(): Promise<AdminMetricsResponseDto> {
    const [completed, inProgress] = await Promise.all([
      this.prisma.surveyResponse.count({
        where: { status: Status.SUBMITTED },
      }),
      this.prisma.surveyResponse.count({
        where: { status: Status.DRAFT },
      }),
    ]);

    return {
      completed,
      inProgress,
    };
  }
}
