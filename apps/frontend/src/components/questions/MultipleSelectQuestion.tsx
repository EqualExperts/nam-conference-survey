import { Card, Title, Text, Checkbox, Stack, TextInput, Textarea, Group } from '@mantine/core';
import { useMemo } from 'react';

interface MultipleSelectQuestionProps {
  id: string;
  question: string;
  transparency: string;
  readonly options: readonly { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherMaxLength?: number;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  commentPlaceholder?: string;
  commentMaxLength?: number;
  questionNumber?: number;
  totalQuestions?: number;
}

export function MultipleSelectQuestion({
  id: _id,
  question,
  transparency,
  options,
  values,
  onChange,
  otherValue,
  onOtherChange,
  comment,
  onCommentChange,
  commentPlaceholder = 'Share any additional thoughts...',
  questionNumber,
  totalQuestions,
}: MultipleSelectQuestionProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {questionNumber && totalQuestions && (
          <Text size="xs" c="dimmed" fw={500}>
            Question {questionNumber} of {totalQuestions}
          </Text>
        )}
        <Title order={3} size="h4">
          {question}
        </Title>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        <Checkbox.Group value={values} onChange={onChange}>
          <Stack gap="sm">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Stack>
        </Checkbox.Group>

        {onOtherChange && (
          <TextInput
            label="Other (please specify)"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.currentTarget.value)}
            placeholder="Please specify..."
          />
        )}

        {onCommentChange && (
          <Textarea
            label="Additional comments (optional)"
            value={comment || ''}
            onChange={(e) => onCommentChange(e.currentTarget.value)}
            placeholder={commentPlaceholder}
            minRows={2}
            autosize
          />
        )}
      </Stack>
    </Card>
  );
}
