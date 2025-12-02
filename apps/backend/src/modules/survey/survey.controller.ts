import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SurveyService } from './survey.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { SurveyResponseDto } from './dto/survey-response.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  /**
   * POST /api/survey/submit
   * Submit anonymous survey response
   * Rate limited to 10 submissions per hour per IP
   */
  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 10, ttl: 3600000 } }) // 10 requests per hour
  async submitSurvey(
    @Body() createSurveyResponseDto: CreateSurveyResponseDto,
  ): Promise<SurveyResponseDto> {
    return this.surveyService.submitSurvey(createSurveyResponseDto);
  }
}
