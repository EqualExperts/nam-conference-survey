import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client';

describe('AdminService', () => {
  let service: AdminService;

  const mockPrismaService = {
    surveyResponse: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMetrics', () => {
    it('should return zero counts for empty database', async () => {
      mockPrismaService.surveyResponse.count.mockResolvedValue(0);

      const result = await service.getMetrics();

      expect(result).toEqual({
        completed: 0,
        inProgress: 0,
      });
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledTimes(2);
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledWith({
        where: { status: Status.SUBMITTED },
      });
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledWith({
        where: { status: Status.DRAFT },
      });
    });

    it('should return correct counts with only completed responses', async () => {
      mockPrismaService.surveyResponse.count
        .mockResolvedValueOnce(47) // SUBMITTED count
        .mockResolvedValueOnce(0); // DRAFT count

      const result = await service.getMetrics();

      expect(result).toEqual({
        completed: 47,
        inProgress: 0,
      });
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledTimes(2);
    });

    it('should return correct counts with only in-progress responses', async () => {
      mockPrismaService.surveyResponse.count
        .mockResolvedValueOnce(0) // SUBMITTED count
        .mockResolvedValueOnce(5); // DRAFT count

      const result = await service.getMetrics();

      expect(result).toEqual({
        completed: 0,
        inProgress: 5,
      });
    });

    it('should return correct counts with mix of both statuses', async () => {
      mockPrismaService.surveyResponse.count
        .mockResolvedValueOnce(47) // SUBMITTED count
        .mockResolvedValueOnce(3); // DRAFT count

      const result = await service.getMetrics();

      expect(result).toEqual({
        completed: 47,
        inProgress: 3,
      });
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledWith({
        where: { status: Status.SUBMITTED },
      });
      expect(mockPrismaService.surveyResponse.count).toHaveBeenCalledWith({
        where: { status: Status.DRAFT },
      });
    });

    it('should execute both count queries in parallel', async () => {
      const countSpy = jest
        .spyOn(mockPrismaService.surveyResponse, 'count')
        .mockResolvedValue(10);

      await service.getMetrics();

      expect(countSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getRecentResponses', () => {
    it('should return empty array for empty database', async () => {
      mockPrismaService.surveyResponse.findMany.mockResolvedValue([]);

      const result = await service.getRecentResponses();

      expect(result).toEqual({
        responses: [],
      });
      expect(mockPrismaService.surveyResponse.findMany).toHaveBeenCalledWith({
        where: { status: Status.SUBMITTED },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          createdAt: true,
        },
      });
    });

    it('should return responses with correct structure', async () => {
      const mockResponses = [
        {
          id: '550e8400-e29b-41d4-a716-446655440047',
          createdAt: new Date('2025-12-03T14:34:22.123Z'),
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440046',
          createdAt: new Date('2025-12-03T13:12:45.456Z'),
        },
      ];

      mockPrismaService.surveyResponse.findMany.mockResolvedValue(
        mockResponses,
      );

      const result = await service.getRecentResponses();

      expect(result).toEqual({
        responses: [
          {
            id: '550e8400-e29b-41d4-a716-446655440047',
            submittedAt: new Date('2025-12-03T14:34:22.123Z'),
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440046',
            submittedAt: new Date('2025-12-03T13:12:45.456Z'),
          },
        ],
      });
    });

    it('should return maximum of 5 responses', async () => {
      const mockResponses = Array.from({ length: 5 }, (_, i) => ({
        id: `550e8400-e29b-41d4-a716-44665544004${i}`,
        createdAt: new Date(`2025-12-0${5 - i}T14:34:22.123Z`),
      }));

      mockPrismaService.surveyResponse.findMany.mockResolvedValue(
        mockResponses,
      );

      const result = await service.getRecentResponses();

      expect(result.responses).toHaveLength(5);
      expect(mockPrismaService.surveyResponse.findMany).toHaveBeenCalledWith({
        where: { status: Status.SUBMITTED },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          createdAt: true,
        },
      });
    });

    it('should filter by SUBMITTED status only', async () => {
      mockPrismaService.surveyResponse.findMany.mockResolvedValue([]);

      await service.getRecentResponses();

      expect(mockPrismaService.surveyResponse.findMany).toHaveBeenCalledWith({
        where: { status: Status.SUBMITTED },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          createdAt: true,
        },
      });
    });

    it('should order by createdAt descending', async () => {
      mockPrismaService.surveyResponse.findMany.mockResolvedValue([]);

      await service.getRecentResponses();

      expect(mockPrismaService.surveyResponse.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        }),
      );
    });

    it('should select only id and createdAt fields', async () => {
      mockPrismaService.surveyResponse.findMany.mockResolvedValue([]);

      await service.getRecentResponses();

      expect(mockPrismaService.surveyResponse.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: {
            id: true,
            createdAt: true,
          },
        }),
      );
    });

    it('should map createdAt to submittedAt', async () => {
      const mockResponses = [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          createdAt: new Date('2025-12-03T14:34:22.123Z'),
        },
      ];

      mockPrismaService.surveyResponse.findMany.mockResolvedValue(
        mockResponses,
      );

      const result = await service.getRecentResponses();

      expect(result.responses[0]).toHaveProperty('submittedAt');
      expect(result.responses[0]).not.toHaveProperty('createdAt');
      expect(result.responses[0].submittedAt).toEqual(
        new Date('2025-12-03T14:34:22.123Z'),
      );
    });
  });
});
