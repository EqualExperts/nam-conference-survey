import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { SurveyResponseDto } from './dto/survey-response.dto';

describe('SurveyController', () => {
  let controller: SurveyController;
  let service: SurveyService;

  const mockSurveyService = {
    submitSurvey: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [
        {
          provide: SurveyService,
          useValue: mockSurveyService,
        },
      ],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
    service = module.get<SurveyService>(SurveyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('submitSurvey', () => {
    it('should submit survey successfully', async () => {
      const dto: CreateSurveyResponseDto = {
        q1OverallRating: 5,
        q1Comment: 'Great conference!',
      };

      const expectedResponse = new SurveyResponseDto(
        'response-id',
        'user-id',
        'SUBMITTED',
        new Date(),
      );

      mockSurveyService.submitSurvey.mockResolvedValue(expectedResponse);

      const result = await controller.submitSurvey(dto);

      expect(result).toEqual(expectedResponse);
      expect(service.submitSurvey).toHaveBeenCalledWith(dto);
      expect(service.submitSurvey).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const dto: CreateSurveyResponseDto = {};

      mockSurveyService.submitSurvey.mockRejectedValue(
        new BadRequestException('Cannot submit empty survey'),
      );

      await expect(controller.submitSurvey(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should accept partial submission', async () => {
      const dto: CreateSurveyResponseDto = {
        q1OverallRating: 4,
      };

      const expectedResponse = new SurveyResponseDto(
        'partial-id',
        'user-id',
        'SUBMITTED',
        new Date(),
      );

      mockSurveyService.submitSurvey.mockResolvedValue(expectedResponse);

      const result = await controller.submitSurvey(dto);

      expect(result).toBeDefined();
      expect(result.status).toBe('submitted');
    });
  });
});
