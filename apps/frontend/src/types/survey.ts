export interface SurveyFormState {
  // Q1: Overall Rating - Likert scale
  readonly q1OverallRating: number | null;
  readonly q1Comment: string;

  // Q2: Return Intent - Likert scale
  readonly q2ReturnIntent: number | null;
  readonly q2Comment: string;

  // Q3: Coworking Effectiveness - Likert with N/A
  readonly q3CoworkingEffectiveness: string | null;  // '1'-'5', 'NA', or null
  readonly q3Comment: string;

  // Q4: Connection Types - Multiple select
  readonly q4ConnectionTypes: readonly string[];
  readonly q4ConnectionOther: string;
  readonly q4Comment: string;

  // Q5: Connection Depth - Likert scale
  readonly q5ConnectionDepth: number | null;
  readonly q5Comment: string;

  // Q6: Learning Value - Likert scale
  readonly q6LearningValue: number | null;
  readonly q6Comment: string;

  // Q7: Future Topics - Open-ended
  readonly q7FutureTopics: string;

  // Q8: Saturday Worth - Likert with N/A
  readonly q8SaturdayWorth: string | null;
  readonly q8Comment: string;

  // Q9: Pre-Conference Communication - Likert scale
  readonly q9PreConferenceCommunication: number | null;
  readonly q9Comment: string;

  // Q10: Accommodations Venue - Likert with N/A
  readonly q10AccommodationsVenue: string | null;
  readonly q10Comment: string;

  // Q11: Session Rankings - Ranking
  readonly q11SessionRankings: Readonly<Record<string, number>>;

  // Q12: Conference Length - Single choice
  readonly q12ConferenceLength: string;
  readonly q12Comment: string;

  // Q13: Comparison to PD - Likert with N/A
  readonly q13ComparisonToPD: string | null;
  readonly q13Comment: string;

  // Q14: Liked Most - Open-ended
  readonly q14LikedMost: string;

  // Q15: Additional Feedback - Open-ended
  readonly q15AdditionalFeedback: string;

  // Q16: Improvements - Single choice
  readonly q16Improvements: string;
  readonly q16Comment: string;

  // Q17: Feedback Confidence - Multiple select
  readonly q17FeedbackConfidence: readonly string[];
  readonly q17FeedbackOther: string;

  // Q18: Employment Status - Single choice
  readonly q18EmploymentStatus: string;

  // Q19: Name and Location - Text fields
  readonly q19Name: string;
  readonly q19Location: string;
}

export interface SurveySubmissionResponse {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  message: string;
}
