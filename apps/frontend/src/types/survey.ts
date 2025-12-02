export interface SurveyFormState {
  // Likert scale questions (number or null)
  q1OverallRating: number | null;
  q1Comment: string;
  q2ReturnIntent: number | null;
  q2Comment: string;
  
  // Likert with N/A (string or null)
  q3CoworkingEffectiveness: string | null;  // '1'-'5', 'NA', or null
  q3Comment: string;
  
  // Multiple select
  q4ConnectionTypes: string[];
  q4ConnectionOther: string;
  
  // Additional questions (matching backend schema)
  q5ConnectionDepth: number | null;
  q5Comment: string;
  q6LearningValue: number | null;
  q6Comment: string;
  q7FutureTopics: string;
  q8SaturdayWorth: string | null;
  q8Comment: string;
  q9PreConferenceCommunication: number | null;
  q10AccommodationsVenue: string | null;
  q11SessionRankings: Record<string, number>;
  q12ConferenceLength: string;
  q13ComparisonToPD: string | null;
  q14LikedMost: string;
  q15AdditionalFeedback: string;
  q16Improvements: string;
  q16Comment: string;
  q17FeedbackConfidence: string[];
  q18EmploymentStatus: string;
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