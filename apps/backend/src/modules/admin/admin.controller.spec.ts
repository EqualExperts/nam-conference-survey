import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  const mockAdminService = {
    getMetrics: jest.fn(),
    getRecentResponses: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMetrics', () => {
    it('should return metrics from service', async () => {
      const mockMetrics = {
        completed: 47,
        inProgress: 3,
      };

      mockAdminService.getMetrics.mockResolvedValue(mockMetrics);

      const result = await controller.getMetrics();

      expect(result).toEqual(mockMetrics);
      expect(mockAdminService.getMetrics).toHaveBeenCalledTimes(1);
    });

    it('should return zero metrics for empty state', async () => {
      const mockMetrics = {
        completed: 0,
        inProgress: 0,
      };

      mockAdminService.getMetrics.mockResolvedValue(mockMetrics);

      const result = await controller.getMetrics();

      expect(result).toEqual(mockMetrics);
    });
  });

  describe('getRecentResponses', () => {
    it('should return recent responses from service', async () => {
      const mockResponses = {
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
      };

      mockAdminService.getRecentResponses.mockResolvedValue(mockResponses);

      const result = await controller.getRecentResponses();

      expect(result).toEqual(mockResponses);
      expect(mockAdminService.getRecentResponses).toHaveBeenCalledTimes(1);
    });

    it('should return empty array for empty state', async () => {
      const mockResponses = {
        responses: [],
      };

      mockAdminService.getRecentResponses.mockResolvedValue(mockResponses);

      const result = await controller.getRecentResponses();

      expect(result).toEqual(mockResponses);
    });
  });
});
