export interface SurveyFormState {
  // Q1: Overall Rating - Likert scale
  q1OverallRating: number | null;
  q1Comment: string;

  // Q2: Return Intent - Likert scale
  q2ReturnIntent: number | null;
  q2Comment: string;

  // Q3: Coworking Effectiveness - Likert with N/A
  q3CoworkingEffectiveness: string | null;  // '1'-'5', 'NA', or null
  q3Comment: string;

  // Q4: Connection Types - Multiple select
  q4ConnectionTypes: string[];
  q4ConnectionOther: string;
  q4Comment: string;

  // Q5: Connection Depth - Likert scale
  q5ConnectionDepth: number | null;
  q5Comment: string;

  // Q6: Learning Value - Likert scale
  q6LearningValue: number | null;
  q6Comment: string;

  // Q7: Future Topics - Open-ended
  q7FutureTopics: string;

  // Q8: Saturday Worth - Likert with N/A
  q8SaturdayWorth: string | null;
  q8Comment: string;

  // Q9: Pre-Conference Communication - Likert scale
  q9PreConferenceCommunication: number | null;
  q9Comment: string;

  // Q10: Accommodations Venue - Likert with N/A
  q10AccommodationsVenue: string | null;
  q10Comment: string;

  // Q11: Session Rankings - Ranking
  q11SessionRankings: Record<string, number>;

  // Q12: Conference Length - Single choice
  q12ConferenceLength: string;
  q12Comment: string;

  // Q13: Comparison to PD - Likert with N/A
  q13ComparisonToPD: string | null;
  q13Comment: string;

  // Q14: Liked Most - Open-ended
  q14LikedMost: string;

  // Q15: Additional Feedback - Open-ended
  q15AdditionalFeedback: string;

  // Q16: Improvements - Single choice
  q16Improvements: string;
  q16Comment: string;

  // Q17: Feedback Confidence - Multiple select
  q17FeedbackConfidence: string[];
  q17FeedbackOther: string;

  // Q18: Employment Status - Single choice
  q18EmploymentStatus: string;

  // Q19: Name and Location - Text fields
  q19Name: string;
  q19Location: string;
}

export interface SurveySubmissionResponse {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  message: string;
}
