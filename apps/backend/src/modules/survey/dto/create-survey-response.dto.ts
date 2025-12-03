import {
  IsInt,
  IsString,
  IsArray,
  IsOptional,
  Min,
  Max,
  IsIn,
  IsObject,
} from 'class-validator';

// Custom validators for Likert scales with N/A
const LIKERT_WITH_NA_VALUES = ['1', '2', '3', '4', '5', 'NA'];

export class CreateSurveyResponseDto {
  // Q1: Overall conference rating (Likert 1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  q1OverallRating?: number;

  @IsOptional()
  @IsString()
  q1Comment?: string;

  // Q2: Return attendance intent (Likert 1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  q2ReturnIntent?: number;

  @IsOptional()
  @IsString()
  q2Comment?: string;

  // Q3: Coworking day effectiveness (Likert with N/A)
  @IsOptional()
  @IsString()
  @IsIn(LIKERT_WITH_NA_VALUES, {
    message: 'q3CoworkingEffectiveness must be 1-5 or NA',
  })
  q3CoworkingEffectiveness?: string;

  @IsOptional()
  @IsString()
  q3Comment?: string;

  // Q4: Connection types (multiple select)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  q4ConnectionTypes?: string[];

  @IsOptional()
  @IsString()
  q4ConnectionOther?: string;

  @IsOptional()
  @IsString()
  q4Comment?: string;

  // Q5: Connection depth (Likert 1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  q5ConnectionDepth?: number;

  @IsOptional()
  @IsString()
  q5Comment?: string;

  // Q6: Learning value (Likert 1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  q6LearningValue?: number;

  @IsOptional()
  @IsString()
  q6Comment?: string;

  // Q7: Future learning topics (open-ended)
  @IsOptional()
  @IsString()
  q7FutureTopics?: string;

  // Q8: Saturday personal time worth (Likert with N/A)
  @IsOptional()
  @IsString()
  @IsIn(LIKERT_WITH_NA_VALUES, {
    message: 'q8SaturdayWorth must be 1-5 or NA',
  })
  q8SaturdayWorth?: string;

  @IsOptional()
  @IsString()
  q8Comment?: string;

  // Q9: Pre-conference communication (Likert 1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  q9PreConferenceCommunication?: number;

  @IsOptional()
  @IsString()
  q9Comment?: string;

  // Q10: Accommodations, venue & catering (Likert with N/A)
  @IsOptional()
  @IsString()
  @IsIn(LIKERT_WITH_NA_VALUES, {
    message: 'q10AccommodationsVenue must be 1-5 or NA',
  })
  q10AccommodationsVenue?: string;

  @IsOptional()
  @IsString()
  q10Comment?: string;

  // Q11: Session format rankings (JSON object)
  @IsOptional()
  @IsObject()
  q11SessionRankings?: Record<string, number>;

  // Q12: Conference length (single choice)
  @IsOptional()
  @IsString()
  @IsIn(['too_short', 'just_right', 'too_long', 'unsure'], {
    message: 'q12ConferenceLength must be too_short, just_right, too_long, or unsure',
  })
  q12ConferenceLength?: string;

  @IsOptional()
  @IsString()
  q12Comment?: string;

  // Q13: Comparison to other PD (Likert with N/A)
  @IsOptional()
  @IsString()
  @IsIn(LIKERT_WITH_NA_VALUES, {
    message: 'q13ComparisonToPD must be 1-5 or NA',
  })
  q13ComparisonToPD?: string;

  @IsOptional()
  @IsString()
  q13Comment?: string;

  // Q14: What you liked most (open-ended)
  @IsOptional()
  @IsString()
  q14LikedMost?: string;

  // Q15: Additional feedback (open-ended)
  @IsOptional()
  @IsString()
  q15AdditionalFeedback?: string;

  // Q16: Improvements from last year (single choice with comment)
  @IsOptional()
  @IsString()
  @IsIn(['yes_clear', 'some', 'no_changes', 'not_sure', 'did_not_attend', 'first_conference'], {
    message: 'q16Improvements must be yes_clear, some, no_changes, not_sure, did_not_attend, or first_conference',
  })
  q16Improvements?: string;

  @IsOptional()
  @IsString()
  q16Comment?: string;

  // Q17: Feedback confidence (multiple select)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  q17FeedbackConfidence?: string[];

  @IsOptional()
  @IsString()
  q17FeedbackOther?: string;

  // Q18: Employment status (single choice)
  @IsOptional()
  @IsString()
  @IsIn(['employee', 'active_associate', 'alumni_associate', 'client', 'prefer_not'], {
    message: 'q18EmploymentStatus must be employee, active_associate, alumni_associate, client, or prefer_not',
  })
  q18EmploymentStatus?: string;

  // Q19: Name and location (demographics)
  @IsOptional()
  @IsString()
  q19Name?: string;

  @IsOptional()
  @IsString()
  q19Location?: string;
}
