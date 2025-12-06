import { Card, Title, Text, TextInput, Stack, Group } from '@mantine/core';
import { useMemo } from 'react';

interface TextFieldQuestionProps {
  id: string;
  question: string;
  transparency: string;
  fields: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
  }[];
  questionNumber?: number;
  totalQuestions?: number;
}

function FieldWithCounter({ field }: { field: TextFieldQuestionProps['fields'][0] }) {
  const charCount = field.value?.length || 0;
  const remaining = field.maxLength ? field.maxLength - charCount : null;

  const counterState = useMemo(() => {
    if (!field.maxLength || remaining === null) return null;

    if (remaining < 0) {
      return {
        color: 'red.7',
        message: 'error',
      };
    }

    const warningThreshold = Math.floor(field.maxLength * 0.9);
    if (charCount >= warningThreshold) {
      return {
        color: 'yellow.7',
        message: 'warning',
      };
    }

    return {
      color: 'dimmed',
      message: 'normal',
    };
  }, [field.maxLength, remaining, charCount]);

  return (
    <Stack gap="xs">
      <TextInput
        key={field.id}
        label={field.label}
        value={field.value}
        onChange={(e) => field.onChange(e.currentTarget.value)}
        placeholder={field.placeholder || ''}
        error={field.maxLength && remaining !== null && remaining < 0 ?
          `Please reduce to ${field.maxLength} characters or fewer` : undefined}
      />
      {field.maxLength && (
        <Group justify="space-between" gap="xs">
          <Text
            size="sm"
            c={counterState?.color}
            fw={counterState?.message === 'error' ? 600 : 400}
            aria-live="polite"
            aria-atomic="true"
          >
            {remaining !== null && remaining >= 0
              ? `${remaining} characters remaining (${charCount} / ${field.maxLength})`
              : `${Math.abs(remaining!)} characters over limit (${charCount} / ${field.maxLength})`}
          </Text>
        </Group>
      )}
    </Stack>
  );
}

export function TextFieldQuestion({
  id: _id,
  question,
  transparency,
  fields,
  questionNumber,
  totalQuestions,
}: TextFieldQuestionProps) {
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

        <Stack gap="sm">
          {fields.map((field) => (
            <FieldWithCounter key={field.id} field={field} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}