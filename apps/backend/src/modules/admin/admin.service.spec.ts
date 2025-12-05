import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client';

describe('AdminService', () => {
  let service: AdminService;

  const mockPrismaService = {
    surveyResponse: {
      count: jest.fn(),
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
});
