export interface LikertAnswer {
  value: number;
  label: string;
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
  submittedAt: string;
  questions: QuestionAnswer[];
}
