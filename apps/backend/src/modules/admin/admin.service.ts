import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminMetricsResponseDto } from './dto/admin-metrics-response.dto';
import { AdminRecentResponsesResponseDto } from './dto/admin-recent-responses.dto';
import { ResponseDetailDto, QuestionAnswer, Answer } from './dto/response-detail.dto';
import { Status, SurveyResponse } from '@prisma/client';
import { QUESTION_METADATA, QuestionMetadata } from './constants/question-metadata';

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

  async getResponseDetail(id: string): Promise<ResponseDetailDto> {
    const response = await this.prisma.surveyResponse.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }

    const questions = QUESTION_METADATA.map((metadata) =>
      this.transformQuestion(metadata, response),
    );

    return {
      id: response.id,
      submittedAt: response.createdAt.toISOString(),
      questions,
    };
  }

  private transformQuestion(
    metadata: QuestionMetadata,
    response: SurveyResponse,
  ): QuestionAnswer {
    const answer = this.extractAnswer(metadata, response);

    return {
      questionNumber: metadata.questionNumber,
      questionText: metadata.questionText,
      questionType: metadata.questionType,
      answer,
    };
  }

  private extractAnswer(
    metadata: QuestionMetadata,
    response: SurveyResponse,
  ): Answer {
    const fieldValue = response[metadata.field as keyof SurveyResponse];

    switch (metadata.questionType) {
      case 'likert':
        return this.extractLikertAnswer(fieldValue, metadata);
      case 'multi-select':
        return this.extractMultiSelectAnswer(fieldValue, metadata, response);
      case 'ranking':
        return this.extractRankingAnswer(fieldValue);
      case 'open-ended':
        return this.extractOpenEndedAnswer(fieldValue, metadata, response);
      case 'single-choice':
        return this.extractSingleChoiceAnswer(fieldValue);
      default:
        return null;
    }
  }

  private extractLikertAnswer(
    fieldValue: unknown,
    metadata: QuestionMetadata,
  ): Answer {
    if (fieldValue === null || fieldValue === undefined) {
      return null;
    }

    // Handle string values (e.g., "5", "N/A")
    if (typeof fieldValue === 'string') {
      const numValue = parseInt(fieldValue, 10);
      if (!isNaN(numValue) && numValue >= 1 && numValue <= 5) {
        return {
          value: numValue,
          label: metadata.likertLabels?.[numValue] || `${numValue}`,
        };
      }
      // Handle N/A or other string values
      return {
        value: 0,
        label: fieldValue,
      };
    }

    // Handle numeric values
    if (typeof fieldValue === 'number') {
      return {
        value: fieldValue,
        label: metadata.likertLabels?.[fieldValue] || `${fieldValue}`,
      };
    }

    return null;
  }

  private extractMultiSelectAnswer(
    fieldValue: unknown,
    metadata: QuestionMetadata,
    response: SurveyResponse,
  ): Answer {
    if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
      return null;
    }

    const selectedOptions = [...fieldValue];

    // Add "Other" field value if exists
    if (metadata.otherField) {
      const otherValue = response[metadata.otherField as keyof SurveyResponse];
      if (otherValue && typeof otherValue === 'string' && otherValue.trim()) {
        selectedOptions.push(`Other: ${otherValue}`);
      }
    }

    return { selectedOptions };
  }

  private extractRankingAnswer(fieldValue: unknown): Answer {
    if (fieldValue === null || fieldValue === undefined) {
      return null;
    }

    // Handle JSON ranking data
    if (typeof fieldValue === 'object' && fieldValue !== null) {
      const rankingObj = fieldValue as Record<string, number>;
      const rankedItems = Object.entries(rankingObj)
        .sort(([, rankA], [, rankB]) => rankA - rankB)
        .map(([item]) => item);

      return rankedItems.length > 0 ? { rankedItems } : null;
    }

    return null;
  }

  private extractOpenEndedAnswer(
    fieldValue: unknown,
    metadata: QuestionMetadata,
    response: SurveyResponse,
  ): Answer {
    if (fieldValue === null || fieldValue === undefined) {
      return null;
    }

    if (typeof fieldValue === 'string' && fieldValue.trim()) {
      // For Q19, combine name and location if both exist
      if (metadata.questionNumber === 19 && metadata.otherField) {
        const locationValue = response[metadata.otherField as keyof SurveyResponse];
        const name = fieldValue.trim();
        const location = typeof locationValue === 'string' ? locationValue.trim() : '';

        if (name && location) {
          return { text: `${name} - ${location}` };
        } else if (name) {
          return { text: name };
        } else if (location) {
          return { text: location };
        }
        return null;
      }

      return { text: fieldValue };
    }

    return null;
  }

  private extractSingleChoiceAnswer(fieldValue: unknown): Answer {
    if (fieldValue === null || fieldValue === undefined) {
      return null;
    }

    if (typeof fieldValue === 'string' && fieldValue.trim()) {
      return { text: fieldValue };
    }

    return null;
  }
}
