import { Card, Title, Text, TextInput, Stack, Group } from '@mantine/core';
import { QuestionNumber } from '../QuestionNumber';

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
  questionNumber: number;
  totalQuestions: number;
}

export function TextFieldQuestion({
  id: _id,
  question,
  transparency,
  fields,
  questionNumber,
  totalQuestions,
}: TextFieldQuestionProps) {
  const ariaLabel = `Question ${questionNumber} of ${totalQuestions}: ${question}`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group gap="md" align="flex-start" wrap="nowrap" visibleFrom="xs">
          <QuestionNumber current={questionNumber} total={totalQuestions} />
          <Title order={3} size="h4" style={{ flex: 1 }} aria-label={ariaLabel}>
            {question}
          </Title>
        </Group>

        <Stack gap={4} hiddenFrom="xs">
          <QuestionNumber current={questionNumber} total={totalQuestions} />
          <Title order={3} size="h4" aria-label={ariaLabel}>
            {question}
          </Title>
        </Stack>

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