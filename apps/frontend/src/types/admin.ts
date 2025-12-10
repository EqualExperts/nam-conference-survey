export interface AdminMetricsResponse {
  completed: number;
  inProgress: number;
}

export interface RecentResponseItem {
  id: string;
  submittedAt: string; // ISO 8601 timestamp
}

export interface AdminRecentResponsesResponse {
  responses: RecentResponseItem[];
}

// Response Detail Types
export interface LikertAnswer {
  value: number; // 1-5
  label: string; // "Very Dissatisfied" | "Dissatisfied" | "Neutral" | "Satisfied" | "Very Satisfied"
}

export interface MultiSelectAnswer {
  selectedOptions: string[];
}

export interface RankingAnswer {
  rankedItems: string[];
}

export interface OpenEndedAnswer {
  text: string;
}

export type Answer =
  | LikertAnswer
  | MultiSelectAnswer
  | RankingAnswer
  | OpenEndedAnswer
  | null;

export interface QuestionAnswer {
  questionNumber: number;
  questionText: string;
  questionType: 'likert' | 'multi-select' | 'ranking' | 'open-ended' | 'single-choice';
  answer: Answer;
}

export interface ResponseDetailDto {
  id: string;
  submittedAt: string; // ISO 8601
  questions: QuestionAnswer[];
}
