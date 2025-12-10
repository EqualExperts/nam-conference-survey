import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { NotFoundException } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;

  const mockAdminService = {
    getMetrics: jest.fn(),
    getRecentResponses: jest.fn(),
    getResponseDetail: jest.fn(),
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

  describe('getResponseDetail', () => {
    it('should return response detail from service', async () => {
      const mockResponseDetail = {
        id: '550e8400-e29b-41d4-a716-446655440047',
        submittedAt: '2025-12-03T14:34:22.123Z',
        questions: [
          {
            questionNumber: 1,
            questionText: 'How would you rate your overall NAM Conference experience?',
            questionType: 'likert' as const,
            answer: {
              value: 5,
              label: 'Excellent',
            },
          },
          {
            questionNumber: 2,
            questionText: 'Would you want to attend NAM Conference again next year?',
            questionType: 'likert' as const,
            answer: null,
          },
        ],
      };

      mockAdminService.getResponseDetail.mockResolvedValue(mockResponseDetail);

      const result = await controller.getResponseDetail('550e8400-e29b-41d4-a716-446655440047');

      expect(result).toEqual(mockResponseDetail);
      expect(mockAdminService.getResponseDetail).toHaveBeenCalledTimes(1);
      expect(mockAdminService.getResponseDetail).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440047');
    });

    it('should propagate NotFoundException from service', async () => {
      mockAdminService.getResponseDetail.mockRejectedValue(
        new NotFoundException('Response with ID non-existent-id not found'),
      );

      await expect(controller.getResponseDetail('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockAdminService.getResponseDetail).toHaveBeenCalledWith('non-existent-id');
    });

    it('should pass the correct ID parameter to service', async () => {
      const testId = 'test-response-id-123';
      const mockResponseDetail = {
        id: testId,
        submittedAt: '2025-12-03T14:34:22.123Z',
        questions: [],
      };

      mockAdminService.getResponseDetail.mockResolvedValue(mockResponseDetail);

      await controller.getResponseDetail(testId);

      expect(mockAdminService.getResponseDetail).toHaveBeenCalledWith(testId);
    });
  });
});
