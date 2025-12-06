import { Card, Title, Text, TextInput, Stack } from '@mantine/core';

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
  }[];
  questionNumber?: number;
  totalQuestions?: number;
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
            <TextInput
              key={field.id}
              label={field.label}
              value={field.value}
              onChange={(e) => field.onChange(e.currentTarget.value)}
              placeholder={field.placeholder || ''}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}