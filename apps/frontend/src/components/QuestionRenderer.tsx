import { memo } from 'react';
import { LikertQuestion } from './questions/LikertQuestion';
import { LikertWithNAQuestion } from './questions/LikertWithNAQuestion';
import { MultipleSelectQuestion } from './questions/MultipleSelectQuestion';
import { RankingQuestion } from './questions/RankingQuestion';
import { OpenEndedQuestion } from './questions/OpenEndedQuestion';
import { SingleChoiceQuestion } from './questions/SingleChoiceQuestion';
import { TextFieldQuestion } from './questions/TextFieldQuestion';
import { QuestionConfig } from '../config/question-types';
import { SurveyFormState } from '../types/survey';
import { useLanguage } from '../contexts/LanguageContext';
import { questionTranslations } from '../translations/questions';
import { uiTranslations } from '../translations/ui';

interface QuestionRendererProps {
  config: QuestionConfig;
  formData: SurveyFormState;
  updateField: <K extends keyof SurveyFormState>(field: K, value: SurveyFormState[K]) => void;
  questionNumber?: number;
  totalQuestions?: number;
}

function QuestionRendererComponent({ config, formData, updateField, questionNumber, totalQuestions }: QuestionRendererProps) {
  const { language } = useLanguage();
  const qt = questionTranslations[language];
  const t = uiTranslations[language];

  // Get question-specific translations
  const qKey = config.id as keyof typeof qt;
  const qTrans = qt[qKey] as any;

  switch (config.type) {
    case 'likert':
      return (
        <LikertQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          options={config.options.map((opt, idx) => ({
            value: opt.value,
            label: qTrans.options[idx],
          }))}
          value={formData[config.field] as number | null}
          onChange={(value) => updateField(config.field, value)}
          comment={formData[config.commentField] as string}
          onCommentChange={(comment) => updateField(config.commentField, comment)}
          commentPlaceholder={qTrans.commentPlaceholder}
          commentMaxLength={config.commentMaxLength}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'likert-with-na':
      return (
        <LikertWithNAQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          options={config.options.map((opt, idx) => ({
            value: opt.value,
            label: qTrans.options[idx],
          }))}
          naLabel={qTrans.naLabel}
          value={formData[config.field] as string | null}
          onChange={(value) => updateField(config.field, value)}
          comment={formData[config.commentField] as string}
          onCommentChange={(comment) => updateField(config.commentField, comment)}
          commentPlaceholder={qTrans.commentPlaceholder}
          commentLabel={qTrans.commentLabel || t.additionalComments}
          commentMaxLength={config.commentMaxLength}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'multiple-select':
      return (
        <MultipleSelectQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          options={qTrans.options}
          values={formData[config.field] as string[]}
          onChange={(values) => updateField(config.field, values)}
          otherValue={config.otherField ? (formData[config.otherField] as string) : undefined}
          onOtherChange={
            config.otherField ? (value) => updateField(config.otherField!, value) : undefined
          }
          otherMaxLength={config.otherMaxLength}
          comment={config.commentField ? (formData[config.commentField] as string) : undefined}
          onCommentChange={
            config.commentField
              ? (comment) => updateField(config.commentField!, comment)
              : undefined
          }
          commentPlaceholder={qTrans.commentPlaceholder}
          commentMaxLength={config.commentMaxLength}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'single-choice':
      return (
        <SingleChoiceQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          options={qTrans.options}
          value={formData[config.field] as string}
          onChange={(value) => updateField(config.field, value)}
          comment={config.commentField ? (formData[config.commentField] as string) : undefined}
          onCommentChange={
            config.commentField
              ? (comment) => updateField(config.commentField!, comment)
              : undefined
          }
          commentMaxLength={config.commentMaxLength}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'ranking':
      return (
        <RankingQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          options={qTrans.options}
          rankings={formData[config.field] as Record<string, number>}
          onChange={(rankings) => updateField(config.field, rankings)}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'open-ended':
      return (
        <OpenEndedQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          value={formData[config.field] as string}
          onChange={(value) => updateField(config.field, value)}
          placeholder={qTrans.placeholder}
          maxLength={config.maxLength}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    case 'text-field':
      return (
        <TextFieldQuestion
          id={config.id}
          question={qTrans.question}
          transparency={qTrans.transparency}
          fields={config.fields.map((fieldConfig) => ({
            id: fieldConfig.id,
            label: qTrans.fields[fieldConfig.id].label,
            value: formData[fieldConfig.field] as string,
            onChange: (value) => updateField(fieldConfig.field, value),
            placeholder: qTrans.fields[fieldConfig.id].placeholder,
            maxLength: fieldConfig.maxLength,
          }))}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      );

    default:
      return null;
  }
}

export const QuestionRenderer = memo(QuestionRendererComponent);
