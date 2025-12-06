import { Card, Title, Text, Stack, Select, Group } from '@mantine/core';
import { QuestionNumber } from '../QuestionNumber';

interface RankingQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  rankings: Record<string, number>;
  onChange: (rankings: Record<string, number>) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function RankingQuestion({
  id: _id,
  question,
  transparency,
  options,
  rankings,
  onChange,
  questionNumber,
  totalQuestions,
}: RankingQuestionProps) {
  const rankOptions = ['1', '2', '3', '4'];
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

        <Text size="sm" fw={500}>
          Rank each option from 1 (most valuable) to 4 (least valuable)
        </Text>

        <Stack gap="sm">
          {options.map((option) => (
            <Select
              key={option.value}
              label={option.label}
              placeholder="Select rank"
              data={rankOptions}
              value={rankings[option.value]?.toString() || ''}
              onChange={(rank) => {
                onChange({
                  ...rankings,
                  [option.value]: rank ? parseInt(rank) : 0,
                });
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}