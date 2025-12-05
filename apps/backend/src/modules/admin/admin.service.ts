import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminMetricsResponseDto } from './dto/admin-metrics-response.dto';
import { AdminRecentResponsesResponseDto } from './dto/admin-recent-responses.dto';
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

  async getRecentResponses(): Promise<AdminRecentResponsesResponseDto> {
    const responses = await this.prisma.surveyResponse.findMany({
      where: { status: Status.SUBMITTED },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        createdAt: true,
      },
    });

    return {
      responses: responses.map((r: { id: string; createdAt: Date }) => ({
        id: r.id,
        submittedAt: r.createdAt,
      })),
    };
  }
}
