import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { Role, Status } from '@prisma/client';

describe('SurveyService', () => {
  let service: SurveyService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    surveyResponse: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockAnonymousUser = {
    id: 'anonymous-user-id',
    email: 'anonymous@survey.local',
    name: 'Anonymous Survey User',
    role: Role.PARTICIPANT,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('submitSurvey', () => {
    it('should accept submission when all fields are empty (all questions optional)', async () => {
      const emptyDto: CreateSurveyResponseDto = {};

      const mockResponse = {
        id: 'empty-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(emptyDto);

      expect(result).toBeDefined();
      expect(result.status).toBe('submitted');
    });

    it('should accept submission when only empty arrays are provided (all questions optional)', async () => {
      const dtoWithEmptyArrays: CreateSurveyResponseDto = {
        q4ConnectionTypes: [],
        q17FeedbackConfidence: [],
      };

      const mockResponse = {
        id: 'empty-arrays-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dtoWithEmptyArrays);

      expect(result).toBeDefined();
      expect(result.status).toBe('submitted');
    });

    it('should create anonymous user if not exists', async () => {
      const dto: CreateSurveyResponseDto = {
        q1OverallRating: 5,
      };

      const mockResponse = {
        id: 'response-id',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dto);

      expect(result.id).toBe('response-id');
      expect(result.userId).toBe(mockAnonymousUser.id);
      expect(result.status).toBe('submitted');
      expect(result.message).toBe('Survey submitted successfully');
    });

    it('should use existing anonymous user if already exists', async () => {
      const dto: CreateSurveyResponseDto = {
        q1OverallRating: 4,
      };

      const mockResponse = {
        id: 'response-id-2',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dto);

      expect(result.id).toBe('response-id-2');
    });

    it('should accept partial submission with single field', async () => {
      const dto: CreateSurveyResponseDto = {
        q1OverallRating: 5,
      };

      const mockResponse = {
        id: 'partial-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dto);

      expect(result).toBeDefined();
      expect(result.status).toBe('submitted');
    });

    it('should handle complete survey submission', async () => {
      const completeDto: CreateSurveyResponseDto = {
        q1OverallRating: 5,
        q1Comment: 'Excellent conference!',
        q2ReturnIntent: 5,
        q3CoworkingEffectiveness: '4',
        q4ConnectionTypes: ['colleagues', 'clients'],
        q5ConnectionDepth: 4,
        q6LearningValue: 5,
        q7FutureTopics: 'AI and ML',
        q8SaturdayWorth: '5',
        q9PreConferenceCommunication: 4,
        q10AccommodationsVenue: '5',
        q11SessionRankings: { workshops: 1, presentations: 2 },
        q12ConferenceLength: 'just_right',
        q13ComparisonToPD: '4',
        q14LikedMost: 'Networking',
        q15AdditionalFeedback: 'Great event',
        q16Improvements: 'better_than_last',
        q17FeedbackConfidence: ['transparency'],
        q18EmploymentStatus: 'employee',
        q19Name: 'John Doe',
        q19Location: 'NYC',
      };

      const mockResponse = {
        id: 'complete-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(completeDto);

      expect(result).toBeDefined();
      expect(result.id).toBe('complete-response');
    });

    it('should handle N/A values correctly', async () => {
      const dtoWithNA: CreateSurveyResponseDto = {
        q3CoworkingEffectiveness: 'NA',
        q8SaturdayWorth: 'NA',
        q10AccommodationsVenue: 'NA',
        q13ComparisonToPD: 'NA',
      };

      const mockResponse = {
        id: 'na-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dtoWithNA);

      expect(result).toBeDefined();
    });

    it('should handle array fields with values', async () => {
      const dtoWithArrays: CreateSurveyResponseDto = {
        q4ConnectionTypes: ['colleagues', 'clients', 'prospects'],
        q17FeedbackConfidence: ['transparency', 'acknowledgment'],
      };

      const mockResponse = {
        id: 'array-response',
        userId: mockAnonymousUser.id,
        status: Status.SUBMITTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          user: {
            findUnique: jest.fn().mockResolvedValue(mockAnonymousUser),
          },
          surveyResponse: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        });
      });

      const result = await service.submitSurvey(dtoWithArrays);

      expect(result).toBeDefined();
    });
  });
});
