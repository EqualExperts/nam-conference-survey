import { SurveyFormState } from '../types/survey';

export type QuestionType =
  | 'likert'
  | 'likert-with-na'
  | 'multiple-select'
  | 'single-choice'
  | 'ranking'
  | 'open-ended'
  | 'text-field';

interface BaseQuestionConfig {
  id: string;
  type: QuestionType;
  question: string;
  transparency: string;
}

export interface LikertOption {
  value: string;
  label: string;
}

export interface LikertQuestionConfig extends BaseQuestionConfig {
  type: 'likert';
  field: keyof SurveyFormState;
  commentField: keyof SurveyFormState;
  options: LikertOption[];
  commentPlaceholder?: string;
  commentMaxLength?: number;
}

export interface LikertWithNAQuestionConfig extends BaseQuestionConfig {
  type: 'likert-with-na';
  field: keyof SurveyFormState;
  commentField: keyof SurveyFormState;
  options: LikertOption[];
  naLabel: string;
  commentPlaceholder?: string;
  commentLabel?: string;
  commentMaxLength?: number;
}

export interface MultipleSelectOption {
  value: string;
  label: string;
}

export interface MultipleSelectQuestionConfig extends BaseQuestionConfig {
  type: 'multiple-select';
  field: keyof SurveyFormState;
  otherField?: keyof SurveyFormState;
  commentField?: keyof SurveyFormState;
  options: MultipleSelectOption[];
  commentPlaceholder?: string;
  commentMaxLength?: number;
  otherMaxLength?: number;
}

export interface SingleChoiceOption {
  value: string;
  label: string;
}

export interface SingleChoiceQuestionConfig extends BaseQuestionConfig {
  type: 'single-choice';
  field: keyof SurveyFormState;
  commentField?: keyof SurveyFormState;
  options: SingleChoiceOption[];
  commentMaxLength?: number;
}

export interface RankingOption {
  value: string;
  label: string;
}

export interface RankingQuestionConfig extends BaseQuestionConfig {
  type: 'ranking';
  field: keyof SurveyFormState;
  options: RankingOption[];
}

export interface OpenEndedQuestionConfig extends BaseQuestionConfig {
  type: 'open-ended';
  field: keyof SurveyFormState;
  placeholder?: string;
  maxLength?: number;
}

export interface TextFieldConfig {
  id: string;
  label: string;
  placeholder?: string;
}

export interface TextFieldQuestionConfig extends BaseQuestionConfig {
  type: 'text-field';
  fields: Array<{
    id: string;
    label: string;
    field: keyof SurveyFormState;
    placeholder?: string;
    maxLength?: number;
  }>;
}

export type QuestionConfig =
  | LikertQuestionConfig
  | LikertWithNAQuestionConfig
  | MultipleSelectQuestionConfig
  | SingleChoiceQuestionConfig
  | RankingQuestionConfig
  | OpenEndedQuestionConfig
  | TextFieldQuestionConfig;
