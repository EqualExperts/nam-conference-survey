import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;

  const mockPrismaService = {
    surveyResponse: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

  describe('getResponseDetail', () => {
    it('should throw NotFoundException when response does not exist', async () => {
      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(null);

      await expect(service.getResponseDetail('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getResponseDetail('non-existent-id')).rejects.toThrow(
        'Response with ID non-existent-id not found',
      );

      expect(mockPrismaService.surveyResponse.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });

    it('should return response detail with all 19 questions', async () => {
      const mockResponse = {
        id: '550e8400-e29b-41d4-a716-446655440047',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: 5,
        q1Comment: 'Great conference!',
        q2ReturnIntent: 5,
        q2Comment: null,
        q3CoworkingEffectiveness: '4',
        q3Comment: null,
        q4ConnectionTypes: ['leadership', 'associates'],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: 4,
        q5Comment: null,
        q6LearningValue: 5,
        q6Comment: null,
        q7FutureTopics: 'AI and Machine Learning',
        q8SaturdayWorth: '5',
        q8Comment: null,
        q9PreConferenceCommunication: 4,
        q9Comment: null,
        q10AccommodationsVenue: '5',
        q10Comment: null,
        q11SessionRankings: { presentations: 1, workshops: 2, coworking: 3, networking: 4 },
        q12ConferenceLength: 'just_right',
        q12Comment: null,
        q13ComparisonToPD: '5',
        q13Comment: null,
        q14LikedMost: 'The networking opportunities',
        q15AdditionalFeedback: 'Keep up the great work',
        q16Improvements: 'yes_clear',
        q16Comment: null,
        q17FeedbackConfidence: ['public_summary', 'action_plan'],
        q17FeedbackOther: null,
        q18EmploymentStatus: 'employee',
        q19Name: 'John Doe',
        q19Location: 'New York, NY',
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('550e8400-e29b-41d4-a716-446655440047');

      expect(result.id).toBe('550e8400-e29b-41d4-a716-446655440047');
      expect(result.submittedAt).toBe('2025-12-03T14:34:22.123Z');
      expect(result.questions).toHaveLength(19);
      expect(result.questions[0].questionNumber).toBe(1);
      expect(result.questions[18].questionNumber).toBe(19);
    });

    it('should correctly transform likert question with numeric value', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: 5,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q1 = result.questions.find(q => q.questionNumber === 1);
      expect(q1?.answer).toEqual({
        value: 5,
        label: 'Excellent',
      });
    });

    it('should correctly transform likert question with string value', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: '5',
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q3 = result.questions.find(q => q.questionNumber === 3);
      expect(q3?.answer).toEqual({
        value: 5,
        label: 'Extremely valuable',
      });
    });

    it('should correctly transform multi-select question', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: ['leadership', 'associates', 'technical_experts'],
        q4ConnectionOther: 'Industry peers',
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q4 = result.questions.find(q => q.questionNumber === 4);
      expect(q4?.answer).toEqual({
        selectedOptions: ['leadership', 'associates', 'technical_experts', 'Other: Industry peers'],
      });
    });

    it('should correctly transform ranking question', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: { workshops: 1, presentations: 2, networking: 3, coworking: 4 },
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q11 = result.questions.find(q => q.questionNumber === 11);
      expect(q11?.answer).toEqual({
        rankedItems: ['workshops', 'presentations', 'networking', 'coworking'],
      });
    });

    it('should correctly transform open-ended question', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: 'AI and Machine Learning\nCloud Architecture',
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q7 = result.questions.find(q => q.questionNumber === 7);
      expect(q7?.answer).toEqual({
        text: 'AI and Machine Learning\nCloud Architecture',
      });
    });

    it('should correctly transform single-choice question', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: 'just_right',
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q12 = result.questions.find(q => q.questionNumber === 12);
      expect(q12?.answer).toEqual({
        text: 'just_right',
      });
    });

    it('should combine name and location for Q19', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: 'Jane Smith',
        q19Location: 'San Francisco, CA',
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q19 = result.questions.find(q => q.questionNumber === 19);
      expect(q19?.answer).toEqual({
        text: 'Jane Smith - San Francisco, CA',
      });
    });

    it('should return null for unanswered questions', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: null,
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      // All questions should have null answers
      result.questions.forEach(q => {
        expect(q.answer).toBeNull();
      });
    });

    it('should handle N/A value for likert questions', async () => {
      const mockResponse = {
        id: 'test-id',
        userId: 'user-123',
        status: Status.SUBMITTED,
        createdAt: new Date('2025-12-03T14:34:22.123Z'),
        updatedAt: new Date('2025-12-03T14:34:22.123Z'),
        q1OverallRating: null,
        q1Comment: null,
        q2ReturnIntent: null,
        q2Comment: null,
        q3CoworkingEffectiveness: 'N/A',
        q3Comment: null,
        q4ConnectionTypes: [],
        q4ConnectionOther: null,
        q4Comment: null,
        q5ConnectionDepth: null,
        q5Comment: null,
        q6LearningValue: null,
        q6Comment: null,
        q7FutureTopics: null,
        q8SaturdayWorth: null,
        q8Comment: null,
        q9PreConferenceCommunication: null,
        q9Comment: null,
        q10AccommodationsVenue: null,
        q10Comment: null,
        q11SessionRankings: null,
        q12ConferenceLength: null,
        q12Comment: null,
        q13ComparisonToPD: null,
        q13Comment: null,
        q14LikedMost: null,
        q15AdditionalFeedback: null,
        q16Improvements: null,
        q16Comment: null,
        q17FeedbackConfidence: [],
        q17FeedbackOther: null,
        q18EmploymentStatus: null,
        q19Name: null,
        q19Location: null,
      };

      mockPrismaService.surveyResponse.findUnique.mockResolvedValue(
        mockResponse,
      );

      const result = await service.getResponseDetail('test-id');

      const q3 = result.questions.find(q => q.questionNumber === 3);
      expect(q3?.answer).toEqual({
        value: 0,
        label: 'N/A',
      });
    });
  });
});
