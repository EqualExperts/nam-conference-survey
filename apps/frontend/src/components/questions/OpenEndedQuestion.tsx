import { Card, Title, Text, Textarea, Stack, Group } from '@mantine/core';
import { QuestionNumber } from '../QuestionNumber';

interface OpenEndedQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  questionNumber: number;
  totalQuestions: number;
}

export function OpenEndedQuestion({
  id: _id,
  question,
  transparency,
  value,
  onChange,
  placeholder = 'Share your thoughts...',
  questionNumber,
  totalQuestions,
}: OpenEndedQuestionProps) {
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

        <Textarea
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
          minRows={4}
          autosize
          maxRows={8}
        />
      </Stack>
    </Card>
  );
}